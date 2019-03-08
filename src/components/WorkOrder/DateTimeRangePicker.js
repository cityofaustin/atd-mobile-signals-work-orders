import React from "react";
import DatePicker from "react-datepicker";
import { FIELDS } from "./formConfig";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const getDateTimeObject = data => {
  let date = data[FIELDS.WORK_SCHEDULED_DATE];
  let rawDate = data[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

  return rawDate ? rawDate : date;
};

const getAllDayValue = data => {
  let date = data[FIELDS.WORK_SCHEDULED_DATE];
  let dateRaw = data[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

  return dateRaw ? dateRaw.all_day : date.all_day;
};

const getFromDateTimeTimestamp = data => getDateTimeObject(data).timestamp;

const getToDateTimeTimestamp = data => getDateTimeObject(data).to.timestamp;

const toggleAllDay = (data, getDateTimeObject, handleScheduledTimeChange) => {
  let updatedData = getDateTimeObject(data);
  updatedData.all_day = !getAllDayValue(data);
  handleScheduledTimeChange(updatedData);
};

const getHours = date => {
  debugger;
  let hours = date.getHours();
  // convert from military hours (13 should be 1, 23 should be 11, etc)
  hours = hours % 12;
  // 00 hours should be 12
  hours = hours ? hours : 12;
  return hours;
};

const getAmPm = date => {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  return ampm;
};

const handleDateTimeFieldChange = (
  date,
  field,
  data,
  getDateTimeObject,
  handleScheduledTimeChange
) => {
  let previousDateField = getDateTimeObject(data);
  let updatedDateField = previousDateField;

  debugger;

  // clear out unneeded raw fields
  delete updatedDateField.date_formatted;
  delete updatedDateField.iso_timestamp;
  delete updatedDateField.unix_timestamp;
  delete updatedDateField.time;
  delete updatedDateField.to.date_formatted;
  delete updatedDateField.to.iso_timestamp;
  delete updatedDateField.to.unix_timestamp;
  delete updatedDateField.to.time;

  if (field === "fromDate") {
    updatedDateField.date = moment(date).format("MM/DD/YYYY");
    updatedDateField.timestamp = moment(
      `${updatedDateField.date} ${previousDateField.hours}:${
        previousDateField.minutes
      } ${previousDateField.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "fromTime") {
    updatedDateField.hours = getHours(date);
    updatedDateField.minutes = date.getMinutes();
    updatedDateField.am_pm = getAmPm(date);
    updatedDateField.timestamp = moment(
      `${previousDateField.date} ${updatedDateField.hours}:${
        updatedDateField.minutes
      } ${updatedDateField.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "toDate") {
    updatedDateField.to.date = moment(date).format("MM/DD/YYYY");
    updatedDateField.to.timestamp = moment(
      `${updatedDateField.to.date} ${previousDateField.to.hours}:${
        previousDateField.to.minutes
      } ${previousDateField.to.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "toTime") {
    updatedDateField.to.hours = getHours(date);
    updatedDateField.to.minutes = date.getMinutes();
    updatedDateField.to.am_pm = getAmPm(date);
    updatedDateField.to.timestamp = moment(
      `${previousDateField.to.date} ${updatedDateField.to.hours}:${
        updatedDateField.to.minutes
      } ${updatedDateField.to.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  }

  handleScheduledTimeChange(updatedDateField);
};

const DateTimeRangePicker = ({
  data,
  fieldName,
  handleScheduledTimeChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={fieldName}>Scheduled Date</label>
      <div className="d-block">
        <DatePicker
          name="startDate"
          selected={new Date(getFromDateTimeTimestamp(data))}
          onChange={e =>
            handleDateTimeFieldChange(
              e,
              "fromDate",
              data,
              getDateTimeObject,
              handleScheduledTimeChange
            )
          }
          className="form-control"
        />
        {!getAllDayValue(data) && (
          <DatePicker
            selected={new Date(getFromDateTimeTimestamp(data))}
            onChange={e =>
              handleDateTimeFieldChange(
                e,
                "fromTime",
                data,
                getDateTimeObject,
                handleScheduledTimeChange
              )
            }
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            className="form-control"
            dateFormat="h:mm aa"
            timeCaption="Time"
            name="startTime"
          />
        )}
        <span>to</span>
        <DatePicker
          name="endDate"
          selected={new Date(getToDateTimeTimestamp(data))}
          onChange={e =>
            handleDateTimeFieldChange(
              e,
              "toDate",
              data,
              getDateTimeObject,
              handleScheduledTimeChange
            )
          }
          className="form-control"
        />
        {!getAllDayValue(data) && (
          <DatePicker
            selected={new Date(getToDateTimeTimestamp(data))}
            onChange={e =>
              handleDateTimeFieldChange(
                e,
                "toTime",
                data,
                getDateTimeObject,
                handleScheduledTimeChange
              )
            }
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            className="form-control"
            dateFormat="h:mm aa"
            timeCaption="Time"
            name="endTime"
          />
        )}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={getAllDayValue(data)}
            onClick={toggleAllDay.bind(
              this,
              data,
              getDateTimeObject,
              handleScheduledTimeChange
            )}
            id="allDayCheck"
          />
          <label className="form-check-label" htmlFor="allDayCheck">
            All day
          </label>
        </div>
      </div>
    </div>
  );
};

export default DateTimeRangePicker;
