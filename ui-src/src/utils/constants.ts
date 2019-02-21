export const TABLE_DATA_BATCH_LIMIT : number = 50;

console.log("###############",process.env.REACT_APP_DNA_INSTANCE);

export let setInstance = ()=>{
  if(process.env.REACT_APP_DNA_INSTANCE)
    return process.env.REACT_APP_DNA_INSTANCE
  else
    return "ERROR > FAKE INSTANCE"
};
// export const DNA_INSTANCE = 'holofuel instance';
