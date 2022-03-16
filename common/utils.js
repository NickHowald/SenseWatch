// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
// © 2017 Allie Reilly
/**
  * Common Utilities
  */

// Array of shortened Month Names
let MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "September", "OCT", "NOV", "DEC"];
let WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/** @function
 *  @name = convert12Hour (hours)
 *  @param {number} hours The hour that needs to be converted
 *  @return {number} hours in 12 hour time
 *  Used to changes hours from 24 hour time to 12 hour time
 */
export function convert12Hour(hours) {
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours;
}

/** @function
 *  @name = getMonth()
 *  @returns {string} String representation of the month
 */
export function getMonth(today) {
  let month = MONTH_NAMES[today.getMonth()];
  return month;
}
/** @function
 *  @name = getDay()
 *  @returns {number} Todays date padded if required 
 */
export function getWeekday(today) {

  let weekday = WEEKDAYS[today.getDay()];
  return weekday;
}
/** @function
 *  @name = getDay()
 *  @returns {number} Todays date padded if required 
 */
export function getDay(today) {

  let day = zeroPad(today.getDate(), 1);
  return day;
}

/** @function
 *  @name = getHours()
 *  @returns {number} The current hour padded if required 
 */
export function getHours(today) {
  
  let hours = today.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = zeroPad(hours, 1);
  return hours;
}

/** @function
 *  @name = getMinutes()
 *  @returns {number} The current minutes padded if required 
 */
export function getMinutes(today) {
  
  let mins = zeroPad(today.getMinutes(), 1);
  return mins;
}

/** @function
 *  @name = getSeconds()
 *  @returns {number} The current seconds padded if required 
 */
export function getSeconds() {
  
  let today = new Date();
  let secs = zeroPad(today.getSeconds(), 1);
  return secs;
}

/** @function
 *  @name = getMiliseconds()
 *  @returns {number} The current milliseconds padded if required 
 */
export function getMilliseconds() {
  
  let today = new Date();
  let milliseconds = zeroPad(today.getMilliseconds(), 2);
  return milliseconds;
}

/** @function
 *  @name = getTime()
 *  @returns {string} The string represention of the current time
 *    including seconds ie. 08:03:02
 */
export function getTime() {
  
  return `${getHours()}:${getMinutes()}:${getSeconds()}}`
}

/** @function
 *  @name = millisecondsToDateString(duration)
 *  @param {number} duration in milliseconds
 *  @returns {Date} The date converted from milliseconds in the 
 *    date format 08:03:02.003
 */
export function millisecondsToDateString(duration) {

  var date = new Date(duration);
  date = ((new Date(duration)).toISOString().match(/(\d\d\:\d\d\:\d\d\.\d\d\d)/)[0]);
  return date;
}

/** @function
 *  @name = millisecondsToDate(duration)
 *  @param {number} duration in milliseconds
 *  @returns {Date} The date converted from milliseconds as a 
 *    date object
 */
export function millisecondsToDate(duration) {

  var date = new Date(duration);
  return date;
}