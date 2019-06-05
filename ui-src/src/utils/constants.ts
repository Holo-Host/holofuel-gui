export const TABLE_DATA_BATCH_LIMIT : number = 50;

export let setInstance = ()=>{
  // here we can locate the dna or nickname, istead of being supplied that in the package.json scripts.
  //
  // Reference the following for instance ID instead:
  // <agentId>::<nickname>
  // OR
  // <agentId>::<dnaHash>
  //
  // for more info, see the following: https://hackmd.io/MEM1brijTUiNKZA87r2FPQ?edit
  //
  if (process.env.REACT_APP_DNA_INSTANCE) {
    // return process.env.REACT_APP_DNA_INSTANCE
    // const agent_id = await hClient.getCurrentAgentId();

    // const agent_id = "MyAgentID"
    // console.log("YOUR agent_id === ", agent_id);
    //
    // const dna_hash = process.env.REACT_APP_DNA_INSTANCE;
    // const instance_id = `${agent_id}::${dna_hash}`;
    const instance_id = process.env.REACT_APP_DNA_INSTANCE;
    return instance_id;
  }
  else {
    return "ERROR: FAKE INSTANCE"
  }
};

export const setPort = () => {
  if (process.env.REACT_APP_NODE_PORT) return process.env.REACT_APP_NODE_PORT;
  return 'ERROR: REACT_APP_NODE_PORT not found at '+ process.env.REACT_APP_NODE_PORT;
};

/****************************************************/
            /*   hClient Constants   */
/***************************************************/
export const CURRENTURL = window.location.href;
// console.log("CURRENT URL", CURRENTURL);

// const happHashId = CURRENTURL.split("/")[4];
// console.log("happHashId", happHashId);

export const HOSTURL = 'ws://' + window.location.host;
console.log("HOST URL", HOSTURL);

// window.location.hash = "/";

// export const DNAHASH = 'QmUrd3q8fF71VM3eA1mSEhcEzRsAiE8XiLnMZXBW6omHdV';
// export const HAPPURL = 'http://holofuel6example.holohost.net'

export const KV_STORE_HAPPHASH = process.env.REACT_APP_KV_STORE_HAPPHASH;
// console.log("Global var: APP_KV_STORE_HAPPHASH", process.env.REACT_APP_KV_STORE_HAPPHASH);
// const KV_STORE_HAPPHASH = "QmcGzWw37s9jYFZE5RGxn19tRtDbD3WFMDnosxWAxBgzqT"
