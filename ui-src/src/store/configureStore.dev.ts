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
import * as holochainclient from '@holochain/hc-web-client';
import * as hClient from '@holo-host/hclient';

(async function findAgentID () {
  const agent_id = await hClient.getCurrentAgentId();
  console.log("YOUR agent_id === ", agent_id);
})();

// const url = 'ws:localhost:3000';
// const url = `ws:localhost:${setPort()}`;
// const hcWc = connect(url);

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = (initialState?: any) => {
  console.log("in it init")

  // Redux Configuration
  const middleware = [];
  const enhancers = [];

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
  // const HOSTURL = 'ws://' + window.location.host;
  const HOSTURL = 'http://holofuel6example.holohost.net'
   console.log(" >>> HOST URL <<<<", HOSTURL);

   const KV_STORE_HAPPHASH = "holofuel";
   // const KV_STORE_HAPPHASH = "holofuel3_dna"

   /***********************  CALLING `makeWebClient` WITH OPTIONALS **************************/
   // If have a DNA-STRING, supplement the options/params with this: { url:URL, dnaHash:DNA })
   // const HAPPHASH:any = 'Qmd3zeMA5S5YWQ4QAZ6JTBPEEAEJwGmoSxkYn6y2Pm4PNV';
   hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, { hostUrl:HOSTURL })
   .then((holoClient:any) => holochainMiddleware(holoClient.connect()));

   /***************************** WITHOUT OPTIONALS *****************************/
   // If NO `hostUrl` optional is provided in `makeWebClient`, then the function should triggr the Resolver to locate a host & host-url/host-domain
   // hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH)
   // .then((holoClient:any) => holochainMiddleware(holoClient.connect()));

  //******************* ********************************** ******************//

  // ** HC Rust Container Middleware ** >> Push HC middleware into middleware array //
  // middleware.push(holochainMiddleware(hcWc));

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

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const storeEnhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, storeEnhancer);
  if ((module as any).hot) {
    (module as any).hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }
  return store;
};

export default { configureStore, history };
