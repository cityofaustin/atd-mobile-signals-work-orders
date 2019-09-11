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
  if (dateTimeObject.timestamp === "Invalid date" && dateTimeObject.date) {
    // DatePicker returns timestamp as "Invalid date" when no time field time is selected ("All day" checkbox selected)
    return new Date(dateTimeObject.date);
  } else if (dateTimeObject.timestamp) {
    // DatePicker returns a valid timestamp when time and date fields are selected ("All day" checkbox not selected)
    return new Date(dateTimeObject.timestamp);
  } else {
    return null;
  }
};
