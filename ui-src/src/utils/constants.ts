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
