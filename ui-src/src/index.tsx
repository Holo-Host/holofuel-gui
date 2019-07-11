import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as hClient from './utils/hclient';
import * as holochainclient from '@holochain/hc-web-client';
import Root from './root';
import { configureStore, history } from './store/configureStore';

let hClientConnected:boolean = false; 
const setHoloClient = new Promise<string>(async (fulfill, reject) => {
  // NOTE: Removed KV_STORE_HAPPHASH due to hClient updates that change the happId param from a required input to an optional one that defaults to hha has fetched from the resolver & KV Store.
  const holoClient = await hClient.makeWebClient(holochainclient);
  fulfill(holoClient);
});
setHoloClient.then(holoClient => {
  const {store: hStore, persistor} = configureStore(holoClient);
  hClientConnected = true;
  console.log("hClientConnected", hClientConnected);

  if(hClientConnected === true){
    ReactDOM.render(<Root history={history} store={hStore} persistor={persistor} />, document.querySelector('#root'));
  }
});

ReactDOM.render(<div/>, document.querySelector('#root'));
