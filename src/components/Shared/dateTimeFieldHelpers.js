import { FIELDS } from "../WorkOrder/formConfig";
import { isEmpty } from "lodash";
import moment from "moment";

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
  return isEmpty(dateTimeObject) ? null : new Date(dateTimeObject.timestamp);
};

export const convertKnackDateTimeToFormDate = knackDateTime =>
  knackDateTime && new Date(knackDateTime.split(" ")[0]);

export const convertKnackDateTimeToFormTime = knackDateTime => {
  const timeString = knackDateTime && knackDateTime.split(" ")[1].toUpperCase();
  const timeSuffix = timeString.slice(-2);
  const formattedTimeString = moment(
    timeString.replace(timeSuffix, " " + timeSuffix),
    "hh:mm a"
  ).toString();
  return knackDateTime ? new Date(formattedTimeString) : null;
};

export const addMissingFieldsWithExistingKnackData = (
  fieldId,
  data,
  timeLogObject,
  updatedFormData
) => {
  const rawFieldsRequiredByKnack = ["date", "hours", "minutes", "am_pm"];

  if (timeLogObject[`${fieldId}_raw`] && !updatedFormData[`${fieldId}`]) {
    // If there is already data from Knack, populate that time
    return { ...timeLogObject[`${fieldId}_raw`], ...data };
  } else if (updatedFormData[`${fieldId}`]) {
    // If a date or time has been chosen in Edit Form
    return { ...updatedFormData[fieldId], ...data };
  } else if (data.date && !data.hours) {
    // If there is not already a time selected, populate 12:00 AM
    data = { ...data, hours: 12, minutes: 0, am_pm: "AM" };
    return data;
  } else if (data.hours && !data.date) {
    // If there is not already a date selected, populate today
    const today = moment()
      .format("MM/DD/YYYY")
      .toString();
    data = { ...data, date: today };
    return data;
  }
};
