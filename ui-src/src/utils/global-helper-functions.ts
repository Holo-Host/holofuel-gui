import { DateTimeString, checkifValidDateTimeString } from './types';
import * as luxon from 'luxon';

export const get_current_datetime = () => {
  const today = luxon.DateTime.local();
  return today;
}

export const create_datetime_from_nums = (yyyy:any, m:any, d:any, hour24:any, min:any) => {
  return luxon.DateTime.local(yyyy, m, d, hour24, min);
}


export const toDateTimeString = (date: any): DateTimeString => {
  if (typeof date === 'string') {
    if (checkifValidDateTimeString(date)) {
      return date;
    }
    else {
      throw new Error(`Invalid date string: ${date}`);
    }
  }
  else {
    // const dateString = luxon.DateTime.fromISO(date.toISOString());
    const dateString = date.toISODate();
    if (checkifValidDateTimeString(dateString)) {
      return dateString;
    }
  }
  throw new Error(`The following invalid DateTimeString was provided: ${date}`);
}

export const getDisplayName = (agentHash: string) => {
  if (agentHash.length > 15 ) {
    return agentHash.substring(0,15) + "...";
  }
  else {
    return agentHash;
  }
}

// ===============================================================
let retrievedState: any;
export const findPersistedState = () => {
  try {
    retrievedState = JSON.parse(localStorage.getItem('persist:root')!);
    if (retrievedState === null || undefined){
      retrievedState = {};
    }
    else {
      let {transactionReducer} = retrievedState;
      const localStorageValue = [transactionReducer].toString();
      const parsedValue = JSON.parse(localStorageValue);
      // console.log(parsedValue);
      retrievedState = {transactionReducer: parsedValue};
    }
  } catch (err){
    // console.log("retrievedState IN ERROR block : ", retrievedState);
    console.log("An error occured when fetching locally persisted state. ERROR: ", err);
    retrievedState = {};
  }
  return retrievedState
}
