import { FIELDS } from "../WorkOrder/formConfig";
import { isEmpty } from "lodash";

export const getHours = date => {
  let hours = date.getHours();
  // convert from military hours (13 should be 1, 23 should be 11, etc)
  hours = hours % 12;
  // 00 hours should be 12
  hours = hours ? hours : 12;
  return hours;
};

export const getAmPm = date => {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  return ampm;
};

export const getDateTimeObject = data => {
  let date = data[FIELDS.WORK_SCHEDULED_DATE];
  let rawDate = data[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

  return rawDate ? rawDate : date;
};
export const getToDateTimeTimestamp = data => {
  let dateTimeObject = getDateTimeObject(data);
  return isEmpty(dateTimeObject) || dateTimeObject.to === undefined
    ? null
    : new Date(dateTimeObject.to.timestamp);
};

export const getFromDateTimeTimestamp = data => {
  let dateTimeObject = getDateTimeObject(data);
  const isAllDay = dateTimeObject.hasOwnProperty("all_day");
  const timestamp = dateTimeObject.timestamp;
  const time = new Date(dateTimeObject.timestamp);
  // Issue happens when new Date() is called on dateTimeObject.timestamp when it is contains "Invalid date"
  // Ex. "All day" checkbox is selected first
  // When all_day is selected first -> true, undefined, Invalid Date
  // When date is selected first -> false, defined, Valid Date
  // When isAllDay === true and timestamp is undefined => null
  // When isAllDay === false and timestramp is defined => new Date
  // When isAllDay === true and timestamp is defined => new Date
  if (dateTimeObject.timestamp === "Invalid date" && dateTimeObject.date) {
    return new Date(dateTimeObject.date);
  } else if (dateTimeObject.timestamp) {
    return new Date(dateTimeObject.timestamp);
  } else {
    return null;
  } // return !dateTimeObject.timestamp ? null : new Date(dateTimeObject.timestamp);
};
