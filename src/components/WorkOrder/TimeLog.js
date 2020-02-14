import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEdit, faClock } from "@fortawesome/free-solid-svg-icons";
import { FIELDS } from "./formConfig";

const TimeLog = ({ data, handleAddTimeLog, handleEditTimeLog }) => {
  const handleAddTimeLogClick = e => {
    // Switch isAddingInventoryItem to show add form
    handleAddTimeLog();
  };

  const handleEditTimeLogClick = (e, timeLogId) => {
    // Switch isEditingInventoryItem to show edit form
    handleEditTimeLog(timeLogId);
  };

  return (
    <div>
      <div
        className={`btn btn-success btn-lg mb-3`}
        onClick={handleAddTimeLogClick}
      >
        <FontAwesomeIcon icon={faClock} /> Add Time Log
      </div>
      {data.length === 0 && <p>No data</p>}
      {data.length > 0 && (
        <ul className="list-group list-group-flush">
          {data.map((timeLog, i) => (
            <li className="list-group-item d-flex row" key={i}>
              <div className="col-4">
                <div className="row">
                  <div className="col-12">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: timeLog[FIELDS.TIMELOG.TECHNICIANS],
                      }}
                    />
                  </div>
                  <div
                    className="col-12"
                    dangerouslySetInnerHTML={{
                      __html: timeLog[FIELDS.TIMELOG.VEHICLES],
                    }}
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <div className="col-12">
                    <span>Received: </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: timeLog[FIELDS.TIMELOG.ISSUE_RECEIVED_TIME],
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <span>Arrived: </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: timeLog[FIELDS.TIMELOG.WORKSITE_ARRIVE],
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <span>Left: </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: timeLog[FIELDS.TIMELOG.WORKSITE_LEAVE],
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <span>Returned: </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: timeLog[FIELDS.TIMELOG.WORKSITE_SHOP_RETURN],
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 mt-2">
                <div
                  className={`btn btn-primary btn-lg`}
                  onClick={e => handleEditTimeLogClick(e, timeLog.id)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!data && (
        <div>
          <FontAwesomeIcon
            icon={faSpinner}
            size="2x"
            className="atd-spinner--padded"
          />
        </div>
      )}
    </div>
  );
};

export default TimeLog;
