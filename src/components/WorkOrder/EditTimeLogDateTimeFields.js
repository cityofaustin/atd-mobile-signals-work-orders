import React from "react";
import TimeLogForm from "./TimeLogForm";
import { FIELDS } from "./formConfig";
import moment from "moment";
import { isEmpty } from "lodash";

import {
  getHours,
  getAmPm,
  convertKnackDateTimeToFormDate,
  convertKnackDateTimeToFormTime,
  addMissingFieldsWithExistingKnackData,
} from "../Shared/dateTimeFieldHelpers.js";

const EditTimeLogDateTimeFields = ({
  data,
  handleTimeChange,
  handleFormDisable,
  isFormDisabled,
  timeLogToEdit,
}) => {
  function handleDateTimeFieldChange(date, fieldId, dateOrTime, data) {
    // set an empty object that will hold the date/time data
    let fieldData = {};

    switch (dateOrTime) {
      case "DATE":
        fieldData.date = moment(date).format("MM/DD/YYYY");
        break;

      case "TIME":
        fieldData.am_pm = getAmPm(date);
        fieldData.hours = getHours(date);
        fieldData.minutes = date.getMinutes();
        break;

      default:
        console.log("default");
        break;
    }

    // Add missing dates or time
    fieldData = addMissingFieldsWithExistingKnackData(
      fieldId,
      fieldData,
      timeLogToEdit,
      data
    );

    handleTimeChange(fieldId, fieldData);
    updateErrorState();
  }

  const getFormSelection = (field, dateOrTime) => {
    if (dateOrTime === "time") {
      return getExistingRecord(field, dateOrTime) || getSelectedTime(field);
    } else if (dateOrTime === "date") {
      return getExistingRecord(field, dateOrTime) || getSelectedDate(field);
    }
  };

  const getSelectedDate = field => {
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

  // Get updated form data to populate picker field (state after update from Edit Form)
  // or convert DateTime in existing record from Knack (initial state)
  const getExistingRecord = (field, recordType) => {
    if (timeLogToEdit) {
      if (data[field]) {
        getSelectedTime(data, field);
      } else {
        if (recordType === "time") {
          return convertKnackDateTimeToFormTime(timeLogToEdit[field]);
        } else if (recordType === "date") {
          return convertKnackDateTimeToFormDate(timeLogToEdit[field]);
        }
      }
    } else {
      return false;
    }
  };

  const getSelectedTime = field => {
    // When the form first loads, autofill current date & time
    // on certain fields to mirror Knack data validation.
    const today = new Date();
    const shouldReturnCurrentDate =
      (isEmpty(data[field]) && field === FIELDS.TIMELOG.ISSUE_RECEIVED_TIME) ||
      (isEmpty(data[field]) && field === FIELDS.TIMELOG.WORKSITE_ARRIVE);

    if (shouldReturnCurrentDate) return today; // default to current time for certain fields
    if (isEmpty(data[field])) return null; // let value start as blank if there's no exisiting data

    let date = data[field].date
      ? data[field].date
      : moment(Date.now()).format("MM/DD/YYYY");

    let momentDate = moment(
      `${date} ${data[field].hours}:${data[field].minutes} ${data[field].am_pm}`
    ).format("MM/DD/YYYY h:mm a");

    return new Date(momentDate);
  };

  const updateErrorState = () => {
    // TODO Handle error state for editing
    const issueRecievedTime = getSelectedTime(
      FIELDS.TIMELOG.ISSUE_RECEIVED_TIME
    );
    const workSiteArriveTime = getSelectedTime(FIELDS.TIMELOG.WORKSITE_ARRIVE);
    const workSiteLeaveTime = getSelectedTime(FIELDS.TIMELOG.WORKSITE_LEAVE);
    const worksiteReturnTime = getSelectedTime(
      FIELDS.TIMELOG.WORKSITE_SHOP_RETURN
    );

    // TODO: Right now, we're checking to make sure times aren't greater than the checkpoint
    // just previous to it. But if some times are left blank, a validation might pass that shouldn't
    const shouldShowError =
      (issueRecievedTime > workSiteArriveTime && !!workSiteArriveTime) ||
      (workSiteArriveTime > workSiteLeaveTime && !!workSiteLeaveTime) ||
      (workSiteLeaveTime > worksiteReturnTime && !!worksiteReturnTime);

    if (shouldShowError) {
      handleFormDisable(true);
    } else {
      handleFormDisable(false);
    }
  };

  return (
    <div>
      <TimeLogForm
        getFormSelection={getFormSelection}
        handleFormChange={handleDateTimeFieldChange}
        isFormDisabled={isFormDisabled}
        data={data}
      />
    </div>
  );
};

export default EditTimeLogDateTimeFields;
