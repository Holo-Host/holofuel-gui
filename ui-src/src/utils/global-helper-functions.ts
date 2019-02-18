import { DateTimeString, checkifValidDateTimeString } from './types';
import * as luxon from 'luxon';
// To Parse from IS0-8601 (date as supplied by Rust Code) through use of Luxon :
//   > DateTime.fromISO("2017-05-15")  //=> May 15, 2017 at midnight
//   > DateTime.fromISO("2017-05-15T08:30:00")  //=> May 15, 2017 at 8:30

// const dt = luxon.DateTime.local();
// Luxon examples with local DateTime (ie:dt)
  // dt.year     //=> 2017
  // dt.month    //=> 9
  // dt.day      //=> 14
  // dt.second   //=> 47
  // dt.weekday  //=> 4

  // dt.toISO(); //=> '2017-04-20T11:32:00.000-04:00'
  // dt.toISODate(); //=> '2017-04-20'
  // dt.toISOWeekDate(); //=> '2017-W17-7'
  // dt.toISOTime(); //=> '11:32:00.000-04:00'


export const get_current_datetime = () => {
  const today = luxon.DateTime.local();
  console.log("LUXON `TODAY` OBJECT", today);
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
