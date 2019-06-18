import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as hClient from './utils/hclient';
import * as holochainclient from '@holochain/hc-web-client';
import { Store } from 'redux';
import Root from './root';
import { configureStore, history } from './store/configureStore';
// import { HOSTURL, KV_STORE_HAPPHASH } from './utils/constants';

// const store:Store = configureStore();
let hClientConnected:boolean = false;
let hStore:Store;

// console.log("process.env.REACT_APP_KV_STORE_HAPPHASH", KV_STORE_HAPPHASH);
//
// console.log("window.location.host >> HOSTURL:", HOSTURL);

const setHoloClient = new Promise<string>(async (fulfill, reject) => {
  // NOTE: Removed KV_STORE_HAPPHASH due to hClient updates that change the happId param from a required input to an optional one that defaults to hha has fetched from the resolver & KV Store.
  const holoClient = await hClient.makeWebClient(holochainclient);

  // TODO: remove happURL once loader iframe isupdated to account for new holo dns/proxy architecture.
  // const holoClient = await hClient.makeWebClient(holochainclient,  { hAppUrl:'http://holofuel6example.holohost.net'});
  fulfill(holoClient);
});
setHoloClient.then(holoClient => {
  console.log("holoClient", holoClient);
  hStore = configureStore(holoClient);

  console.log("hClientConnected", hClientConnected);
  hClientConnected = true;
  console.log("hClientConnected", hClientConnected);

  if(hClientConnected === true){
    ReactDOM.render(<Root history={history} store={hStore} />, document.querySelector('#root'));
  }
});

ReactDOM.render(<div/>, document.querySelector('#root'));
