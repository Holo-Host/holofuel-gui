import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers/index';
import * as transactionActions from '../actions/transactionActions';

// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
// import { setPort } from '../utils/constants';
// import { connect } from '@holochain/hc-web-client';  // '@holochain/hc-web-client'

// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
// import * as asyncInitialState from 'redux-async-initial-state';

// const HOSTURL = 'ws://' + window.location.host;
// const KV_STORE_HAPPHASH = "QmYhReByy4kHs3tAdUGSSfUBhvkhTTcfFvnSBCqAr2KZpq";

// (async function findAgentID () {
//   const agent_id = await hClient.getCurrentAgentId();
//   console.log("YOUR agent_id === ", agent_id);
// })();

// const makeMiddlewareArray = (middlewareParam?: any) => new Promise<Array<any>>(async (fulfill, reject) => {
//   const newMiddleware =  await middlewareParam();
//
//   console.log("newMiddleware", newMiddleware);
//   middleware.push(newMiddleware);
//   fulfill(middleware);
// });

// const url = 'ws:localhost:3000';
// const url = `ws:localhost:${setPort()}`;
// const hcWc = connect(url);

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = (holoClient?: any, initialState?:any) => {
  console.log("holoClient ?? : ", holoClient);

  console.log("in it INIT");
  // Redux Configuration
  const enhancers:any[] = [];
  const middleware:any[] = [];

  // Thunk Middleware
  middleware.push(thunk);

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

  //*********************** Use this for intrceptr server ********************//
  // const KV_STORE_HAPPHASH = "holofuel"
  // const KV_STORE_HAPPHASH = "holofuel3_dna"

  /***************************** WITH hAppUrl OPTIONAL *****************************/
  // If NO `hostUrl` and, instead, a `hAppURL` optional is provided in `makeWebClient`, then the function should trigger the Resolver to locate a host & host-url/host-domain
  // const HAPPURL = 'http://172.26.166.34:48080'
  //  console.log(" >>> HAPP URL <<<<", HAPPURL);
  //
  // hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, {hAppUrl: HAPPURL})
  // .then((holoClient:any) => holochainMiddleware(holoClient.connect()));

  //******************* ********************************** ******************//

  // ** HC Rust Container Middleware ** >> Push HC middleware into middleware array //
  // middleware.push(holochainMiddleware(hcWc));

  /***********************  CALLING `makeWebClient` WITH hostUrl (& DNA) OPTIONALS **************************/
  // If have a DNA-STRING, supplement the options/params with this: { hostUrl:URL, dnaHash:DNA })
  // const HAPPHASH:any = 'Qmd3zeMA5S5YWQ4QAZ6JTBPEEAEJwGmoSxkYn6y2Pm4PNV';

  // Add the hClient middleware when avail.
  if (holoClient) {
    const hClientConnection =  holochainMiddleware(holoClient.connect());
    console.log("hClientConnection", hClientConnection);
    middleware.push(hClientConnection);
  }

  // const setHoloClient = (middlewareParam?: any) => new Promise(async (fulfill, reject) => {
  //   const holoClient = await hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, { hostUrl:HOSTURL});
  //   const hClientConnection =  holochainMiddleware(holoClient.connect());
  //
  //   console.log("hClientConnection", hClientConnection);
  //   middleware.push(hClientConnection);
  //   fulfill(middleware);
  // };

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

    console.log("middleware", middleware);
    console.log("enhancers", enhancers);

    // Create Store
    const store = createStore(rootReducer, initialState, storeEnhancer);
    console.log("Store: ",store);

    if ((module as any).hot) {
      (module as any).hot.accept(
        '../reducers',
        // eslint-disable-next-line global-require
        () => store.replaceReducer(require('../reducers').default)
      );
    }

  //******************* ********************************** ******************//
  // Apply Middleware &  Compose Enhancers
  // const storeEnhancer = composeEnhancers(...enhancers);
  // enhancers.push(applyMiddleware(asyncInitialState.middleware(storeLoad)));

  // // Create Store
  // const store = createStore(rootReducer, initialState, storeEnhancer);
  // console.log("Store: ",store);

  return store;
};

export default { configureStore, history };
