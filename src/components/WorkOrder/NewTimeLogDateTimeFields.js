import React from "react";
import TimeLogForm from "./TimeLogForm";
import { FIELDS } from "./formConfig";
import moment from "moment";
import { isEmpty } from "lodash";

import { getHours, getAmPm } from "../Shared/dateTimeFieldHelpers.js";

const NewTimeLogDateTimeFields = ({
  data,
  handleTimeChange,
  handleFormDisable,
  isFormDisabled,
}) => {
  function handleDateTimeFieldChange(date, fieldId, dateOrTime, data) {
    // set an empty object that will hold the date/time data
    let fieldData = {};

    switch (dateOrTime) {
      case "DATE":
        fieldData.date = moment(date).format("MM/DD/YYYY");
        fieldData.am_pm = isEmpty(data[fieldId]) ? "" : data[fieldId].am_pm;
        fieldData.hours = isEmpty(data[fieldId]) ? "" : data[fieldId].hours;
        fieldData.minutes = isEmpty(data[fieldId]) ? "" : data[fieldId].minutes;
        break;

      case "TIME":
        let today = new Date();

        fieldData.date = isEmpty(data[fieldId])
          ? moment(today).format("MM/DD/YYYY")
          : data[fieldId].date;
        fieldData.am_pm = getAmPm(date);
        fieldData.hours = getHours(date);
        fieldData.minutes = date.getMinutes();
        break;

      default:
        console.log("default");
        break;
    }

    handleTimeChange(fieldId, fieldData);
    updateErrorState();
  }

  const getFormSelection = (field, dateOrTime) => {
    if (dateOrTime === "time") {
      return getSelectedTime(field);
    } else if (dateOrTime === "date") {
      return getSelectedDate(field);
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
    const issueRecievedTime = getSelectedTime(
      data,
      FIELDS.TIMELOG.ISSUE_RECEIVED_TIME
    );
    const workSiteArriveTime = getSelectedTime(
      data,
      FIELDS.TIMELOG.WORKSITE_ARRIVE
    );
    const workSiteLeaveTime = getSelectedTime(
      data,
      FIELDS.TIMELOG.WORKSITE_LEAVE
    );
    const worksiteReturnTime = getSelectedTime(
      data,
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

export default NewTimeLogDateTimeFields;
