import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import {createMigrate, persistStore, persistReducer} from 'redux-persist';
import promise from 'redux-promise-middleware';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers/index';
import * as transactionActions from '../actions/transactionActions';
// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
import { holochainMiddleware } from '@holochain/hc-redux-middleware';

// import * as asyncInitialState from 'redux-async-initial-state';
// const makeMiddlewareArray = (middlewareParam?: any) => new Promise<Array<any>>(async (fulfill, reject) => {
//   const newMiddleware =  await middlewareParam();
//   console.log("newMiddleware", newMiddleware);
//   middleware.push(newMiddleware);
//   fulfill(middleware);
// });

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const migrations = {
  0: (state:any) => {
    return {
  		...state,
  		transactionReducer: {
  			...state.transactionReducer
  		}
  	}
  }
};

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['transactionReducer'], // only transactionReducer will be persisted
  debug: true,
  version: 0,
  migrate: createMigrate(migrations, { debug: true })
};

const configureStore = (holoClient?: any, initialState?:any) => {
  // Redux Configuration
  const enhancers:any[] = [];
  const middleware:any[] = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Promise Middleware
  middleware.push(promise);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Add the hClient middleware when avail.
  if (holoClient) {
    const hClientConnection =  holochainMiddleware(holoClient.connect());
    middleware.push(hClientConnection);
  }

    //******************* ********************************** ******************//
    // Redux DevTools Configuration
    const actionCreators = {
      ...transactionActions,
      ...routerActions
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators
    })
    : compose;
    /* eslint-enable no-underscore-dangle */
    //******************* ********************************** ******************//

    enhancers.push(applyMiddleware(...middleware));
    const storeEnhancer = composeEnhancers(...enhancers);

    // Use persistance to update redux store
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    let retrievedState: any;
    try {
      retrievedState = JSON.parse(localStorage.getItem('persist:root')!);
      if (retrievedState === null || undefined){
        retrievedState = initialState || {};
      }
      else {
        let {transactionReducer} = retrievedState;
        const localStorageValue = [transactionReducer].toString();
        const parsedValue = JSON.parse(localStorageValue);
        // console.log(parsedValue);
        retrievedState = {transactionReducer: parsedValue};
      }
    } catch (err){
      // console.log("retrievedState IN ERROR block : ", retrievedState);
      console.log("An error occured when fetching locally persisted state. ERROR: ", err);
      retrievedState = initialState || {};
    }

    console.log("===========================================");
    console.log("retrievedState : ", retrievedState);
    console.log("===========================================");

    // Create Store
    const store = createStore(persistedReducer, retrievedState, storeEnhancer);
    // console.log("store value: ",store());

    if ((module as any).hot) {
      (module as any).hot.accept(
        '../reducers',
        // eslint-disable-next-line global-require
        () => store.replaceReducer(require('../reducers').default)
      );
    }

  const persistor = persistStore(store);
  return {store, persistor};
};

export default { configureStore, history };
