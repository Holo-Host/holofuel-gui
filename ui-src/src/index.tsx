import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as hClient from './utils/hclient';
import * as holochainclient from '@holochain/hc-web-client';
import { Store } from 'redux';
import Root from './root';
import { configureStore, history } from './store/configureStore';
// import { setHoloClient } from './utils/storeValues';

// const store:Store = configureStore();
let hClientConnected:boolean = false;
let hStore:Store;

// const HOSTURL = 'ws://' + window.location.host;
const HAPPURL = 'http://holofuel6example.holohost.net'
const KV_STORE_HAPPHASH = "QmeqALBa93pXGoTcMxXaGwk2ovqQFLTvkFANZExMEAw6CA"
const DNAHASH = 'QmUrd3q8fF71VM3eA1mSEhcEzRsAiE8XiLnMZXBW6omHdV';
// const HAPPHASH = 'QmTK25g1aWaMMWzTFYMB49KNRFdfDBkkVjnSYAXLUex7SZ';
// console.log(" >>> HOST URL <<<<", HOSTURL);

const setHoloClient = new Promise<string>(async (fulfill, reject) => {
  const holoClient = await hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, { hAppUrl:HAPPURL, dnaHash:DNAHASH });
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
