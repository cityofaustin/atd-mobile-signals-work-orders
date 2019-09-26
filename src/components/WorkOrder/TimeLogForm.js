import React from "react";
import DatePicker from "react-datepicker";
import { BigDateTimePicker } from "../../styles/BigDateTimePicker";
import { FIELDS } from "./formConfig";

import { ErrorMessage } from "./Alerts";

const TimeLogForm = ({
  getFormSelection,
  handleFormChange,
  isFormDisabled,
  data,
}) => {
  return (
    <>
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.ISSUE_RECEIVED_TIME,
                  "time"
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.ISSUE_RECEIVED_TIME,
                  "date"
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_ARRIVE,
                  "time"
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_ARRIVE,
                  "date"
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_LEAVE,
                  "time"
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_LEAVE,
                  "date"
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_SHOP_RETURN,
                  "time"
                )}
                placeholderText="Select a time"
                className="form-control"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                onChange={e =>
                  handleFormChange(
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
                selected={getFormSelection(
                  FIELDS.TIMELOG.WORKSITE_SHOP_RETURN,
                  "date"
                )}
                placeholderText="Select a date"
                className="form-control"
                onChange={e =>
                  handleFormChange(
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
    </>
  );
};

export default TimeLogForm;
