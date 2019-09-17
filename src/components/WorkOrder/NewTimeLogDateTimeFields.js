import React from "react";
import DatePicker from "react-datepicker";
import { FIELDS } from "./formConfig";
import moment from "moment";
import { isEmpty } from "lodash";
import { BigDateTimePicker } from "../../styles/BigDateTimePicker";

import { ErrorMessage } from "./Alerts";
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

  const getSelectedDate = (data, field) => {
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

  const getSelectedTime = (data, field) => {
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
      <div className="form-group">
        <label htmlFor={`${FIELDS.TIMELOG.ISSUE_RECEIVED_TIME}-date`}>
          Issue received
        </label>
        <div className="row">
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_TIME"
                id={`${FIELDS.TIMELOG.ISSUE_RECEIVED_TIME}`}
                selected={getSelectedTime(
                  data,
                  FIELDS.TIMELOG.ISSUE_RECEIVED_TIME
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.ISSUE_RECEIVED_TIME,
                    "TIME",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_DATE"
                id={`${FIELDS.TIMELOG.ISSUE_RECEIVED_TIME}-date`}
                selected={getSelectedDate(
                  data,
                  FIELDS.TIMELOG.ISSUE_RECEIVED_TIME
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.ISSUE_RECEIVED_TIME,
                    "DATE",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor={`${FIELDS.TIMELOG.WORKSITE_ARRIVE}-date`}>
          Arrive at worksite
        </label>
        <div className="row">
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_TIME"
                id={`${FIELDS.TIMELOG.WORKSITE_ARRIVE}`}
                selected={getSelectedTime(data, FIELDS.TIMELOG.WORKSITE_ARRIVE)}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_ARRIVE,
                    "TIME",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_DATE"
                id={`${FIELDS.TIMELOG.WORKSITE_ARRIVE}-date`}
                selected={getSelectedDate(data, FIELDS.TIMELOG.WORKSITE_ARRIVE)}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_ARRIVE,
                    "DATE",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor={`${FIELDS.TIMELOG.WORKSITE_LEAVE}-date`}>
          Leave work site
        </label>
        <div className="row">
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="WORKSITE_LEAVE"
                id={`${FIELDS.TIMELOG.WORKSITE_LEAVE}`}
                selected={getSelectedTime(data, FIELDS.TIMELOG.WORKSITE_LEAVE)}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_LEAVE,
                    "TIME",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_DATE"
                id={`${FIELDS.TIMELOG.WORKSITE_LEAVE}-date`}
                selected={getSelectedDate(data, FIELDS.TIMELOG.WORKSITE_LEAVE)}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_LEAVE,
                    "DATE",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor={`${FIELDS.TIMELOG.WORKSITE_SHOP_RETURN}-date`}>
          Return to shop/home
        </label>

        <div className="row">
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="WORKSITE_SHOP_RETURN"
                id={`${FIELDS.TIMELOG.WORKSITE_SHOP_RETURN}`}
                selected={getSelectedTime(
                  data,
                  FIELDS.TIMELOG.WORKSITE_SHOP_RETURN
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_SHOP_RETURN,
                    "TIME",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
          <div className="col-6">
            <BigDateTimePicker>
              <DatePicker
                name="ISSUE_RECEIVED_DATE"
                id={`${FIELDS.TIMELOG.WORKSITE_SHOP_RETURN}-date`}
                selected={getSelectedDate(
                  data,
                  FIELDS.TIMELOG.WORKSITE_SHOP_RETURN
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleDateTimeFieldChange(
                    e,
                    FIELDS.TIMELOG.WORKSITE_SHOP_RETURN,
                    "DATE",
                    data
                  )
                }
              />
            </BigDateTimePicker>
          </div>
        </div>
      </div>
      {isFormDisabled && (
        <ErrorMessage error={{ message: "Time logs must be in order." }} />
      )}
    </div>
  );
};

export default NewTimeLogDateTimeFields;
