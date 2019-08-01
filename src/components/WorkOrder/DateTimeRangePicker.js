import React from "react";
import DatePicker from "react-datepicker";
import { FIELDS } from "./formConfig";
import moment from "moment";
import { isEmpty } from "lodash";
import {
  getHours,
  getAmPm,
  getToDateTimeTimestamp,
  getDateTimeObject,
  getFromDateTimeTimestamp,
} from "../Shared/dateTimeFieldHelpers.js";

import "react-datepicker/dist/react-datepicker.css";

const getAllDayValue = data => {
  let date = data[FIELDS.WORK_SCHEDULED_DATE];
  let dateRaw = data[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

  return dateRaw ? dateRaw.all_day : date.all_day;
};

const toggleAllDay = (data, getDateTimeObject, handleScheduledTimeChange) => {
  let updatedData = getDateTimeObject(data);
  updatedData.all_day = !getAllDayValue(data);
  handleScheduledTimeChange(updatedData);
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

  // If we are starting from a blank field, skip all this.
  if (!isEmpty(updatedDateField)) {
    // clear out unneeded raw fields
    delete updatedDateField.date_formatted;
    delete updatedDateField.iso_timestamp;
    delete updatedDateField.unix_timestamp;
    delete updatedDateField.time;
    if (updatedDateField.to) {
      delete updatedDateField.to.date_formatted;
      delete updatedDateField.to.iso_timestamp;
      delete updatedDateField.to.unix_timestamp;
      delete updatedDateField.to.time;
    }
  }

  if (field === "fromDate") {
    if (isEmpty(previousDateField)) {
      // Need these to construct a timestamp, so lets give a default
      previousDateField.hours = 12;
      previousDateField.minutes = 0;
      previousDateField.am_pm = "pm";
    }
    updatedDateField.date = moment(date).format("MM/DD/YYYY");
    updatedDateField.timestamp = moment(
      `${updatedDateField.date} ${previousDateField.hours}:${previousDateField.minutes} ${previousDateField.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "fromTime") {
    updatedDateField.hours = getHours(date);
    updatedDateField.minutes = date.getMinutes();
    updatedDateField.am_pm = getAmPm(date);
    updatedDateField.timestamp = moment(
      `${previousDateField.date} ${updatedDateField.hours}:${updatedDateField.minutes} ${updatedDateField.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "toDate") {
    if (isEmpty(previousDateField.to)) {
      previousDateField.to = {};
      previousDateField.to.hours = 12;
      previousDateField.to.minutes = 0;
      previousDateField.to.am_pm = "pm";
    }
    updatedDateField.to.date = moment(date).format("MM/DD/YYYY");
    updatedDateField.to.timestamp = moment(
      `${updatedDateField.to.date} ${previousDateField.to.hours}:${previousDateField.to.minutes} ${previousDateField.to.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  } else if (field === "toTime") {
    updatedDateField.to.hours = getHours(date);
    updatedDateField.to.minutes = date.getMinutes();
    updatedDateField.to.am_pm = getAmPm(date);
    updatedDateField.to.timestamp = moment(
      `${previousDateField.to.date} ${updatedDateField.to.hours}:${updatedDateField.to.minutes} ${updatedDateField.to.am_pm}`
    ).format("MM/DD/YYYY h:mm a");
  }

  handleScheduledTimeChange(updatedDateField);
};

const DateTimeRangePicker = ({
  data,
  fieldName,
  handleScheduledTimeChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={fieldName}>Scheduled Date</label>
      <div className="d-block">
        <DatePicker
          name="startDate"
          selected={getFromDateTimeTimestamp(data)}
          placeholderText="Click to select a date"
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
            selected={getFromDateTimeTimestamp(data)}
            placeholderText="Click to select a time"
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
          selected={getToDateTimeTimestamp(data)}
          placeholderText="Click to select a date"
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
            selected={getToDateTimeTimestamp(data)}
            placeholderText="Click to select a time"
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
