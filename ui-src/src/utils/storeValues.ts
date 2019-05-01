import * as hClient from './hclient';
import * as holochainclient from '@holochain/hc-web-client';

const HOSTURL = 'ws://' + window.location.host;
// console.log(" >>> HOST URL <<<<", HOSTURL);
const KV_STORE_HAPPHASH = "QmUrd3q8fF71VM3eA1mSEhcEzRsAiE8XiLnMZXBW6omHdV"

export const setHoloClient = (middlewareParam?: any) => new Promise(async (fulfill, reject) => {
  const holoClient = await hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, { hostUrl:HOSTURL});
  fulfill(holoClient);
};
