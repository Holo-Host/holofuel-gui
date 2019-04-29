import * as hClient from './hclient';
import * as holochainclient from '@holochain/hc-web-client';

const HOSTURL = 'ws://' + window.location.host;
// console.log(" >>> HOST URL <<<<", HOSTURL);
const KV_STORE_HAPPHASH = "QmYhReByy4kHs3tAdUGSSfUBhvkhTTcfFvnSBCqAr2KZpq"

export const setHoloClient = (middlewareParam?: any) => new Promise(async (fulfill, reject) => {
  const holoClient = await hClient.makeWebClient(holochainclient, KV_STORE_HAPPHASH, { hostUrl:HOSTURL});
  fulfill(holoClient);
};
