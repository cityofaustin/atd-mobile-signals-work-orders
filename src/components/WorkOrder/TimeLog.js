import React from "react";
import { Link } from "react-router-dom";
import Button from "../Form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FIELDS } from "./formConfig";

const TimeLog = ({ data, workOrderId }) => {
  return (
    <div>
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
                <Button
                  icon={faEdit}
                  text={"Edit"}
                  linkPath={`/work-order/${workOrderId}/edit-time-log/${timeLog.id}`}
                  color={"primary"}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {!data && (
        <div>
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
        </div>
      )}
    </div>
  );
};

export default TimeLog;
