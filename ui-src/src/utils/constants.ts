export const TABLE_DATA_BATCH_LIMIT : number = 50;

export let setInstance = ()=>{
  if(process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE
  else
    return "ERROR: FAKE INSTANCE"
};
// export const DNA_INSTANCE = 'holofuel instance';

export let setPort = ()=>{
  if(process.env.PORT)
    return process.env.PORT
  else
    return "ERROR: PORT not found"
};
