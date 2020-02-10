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
  if (timeLogObject[`${fieldId}_raw`] && !updatedFormData[`${fieldId}`]) {
    // If there is already data from Knack, populate that time
    return { ...timeLogObject[`${fieldId}_raw`], ...data };
  } else if (updatedFormData[`${fieldId}`]) {
    // If a date or time has been chosen in Edit Form
    return { ...updatedFormData[fieldId], ...data };
  } else if (data.date && !data.hours) {
    // If there is not already a time selected, populate 12:00 AM
    return { ...data, hours: 12, minutes: 0, am_pm: "AM" };
  } else if (data.hours && !data.date) {
    // If there is not already a date selected, populate today
    const today = moment()
      .format("MM/DD/YYYY")
      .toString();
    return { ...data, date: today };
  }
};

export const getSelectedDate = (data, field) => {
  // When the form first loads, autofill current date & time
  // on certain fields to mirror Knack data validation.
  const today = new Date();
  const shouldReturnCurrentDate =
    (isEmpty(data[field]) && field === FIELDS.TIMELOG.ISSUE_RECEIVED_TIME) ||
    (isEmpty(data[field]) && field === FIELDS.TIMELOG.WORKSITE_ARRIVE);

  if (shouldReturnCurrentDate) return today;
  if (isEmpty(data[field])) return null;

  let date = data[field].date ? new Date(data[field].date) : today;
  return date;
};

export const getSelectedTime = (data, field) => {
  // When the form first loads, autofill current date & time
  // on certain fields to mirror Knack data validation.
  const today = new Date();
  const shouldReturnCurrentDate =
    (isEmpty(data[field]) && field === FIELDS.TIMELOG.ISSUE_RECEIVED_TIME) ||
    (isEmpty(data[field]) && field === FIELDS.TIMELOG.WORKSITE_ARRIVE);

  if (shouldReturnCurrentDate) return today; // default to current time for certain fields
  if (isEmpty(data[field])) return null; // let value start as blank if there's no existing data

  let date = data[field].date
    ? data[field].date
    : moment(Date.now()).format("MM/DD/YYYY");

  let momentDate = moment(
    `${date} ${data[field].hours}:${data[field].minutes} ${data[field].am_pm}`
  ).format("MM/DD/YYYY h:mm a");

  return new Date(momentDate);
};

export const formatDateTimeForFormValidation = (data, field) => {
  if (isEmpty(data[field])) return null; // let value start as blank if there's no existing data
  let date = data[field].date ? data[field].date : data[`${field}_raw`].date;

  let momentDate = data[field].hours
    ? moment(
        `${date} ${data[field].hours}:${data[field].minutes} ${
          data[field].am_pm
        }`
      ).format("MM/DD/YYYY h:mm a")
    : moment(
        `${date} ${data[`${field}_raw`].hours}:${
          data[`${field}_raw`].minutes
        } ${data[`${field}_raw`].am_pm}`
      ).format("MM/DD/YYYY h:mm a");

  return new Date(momentDate);
};
