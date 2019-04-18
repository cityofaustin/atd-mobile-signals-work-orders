import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { workOrderFields } from "../../queries/fields";


const TimeLog = ({data}) => {
    return (
        <div>
            {data.length === 0 && <p>No data</p>}
            {data.length > 0 && (
            <ul className="list-group list-group-flush">
                {data.map((timeLog, i) => (
                <li className="list-group-item d-flex row" key={i}>
                    <div className="col-7">
                    <div className="row">
                        <div className="col-12">
                        <span
                            dangerouslySetInnerHTML={{
                            __html:
                                timeLog[workOrderFields.timelog.TECHNICIAN]
                            }}
                        />
                        </div>
                        <div
                        className="col-12"
                        dangerouslySetInnerHTML={{
                            __html: timeLog[workOrderFields.timelog.VEHICLE]
                        }}
                        />
                    </div>
                    </div>
                    <div className="col-5">
                    <div className="row">
                        <div className="col-12">
                        <span>Recieved: </span>
                        <span
                            dangerouslySetInnerHTML={{
                            __html:
                                timeLog[
                                workOrderFields.timelog.ISSUE_RECEIVED_TIME
                                ]
                            }}
                        />
                        </div>
                        <div className="col-12">
                        <span>Arrived: </span>
                        <span
                            dangerouslySetInnerHTML={{
                            __html:
                                timeLog[
                                workOrderFields.timelog.WORKSITE_ARRIVE
                                ]
                            }}
                        />
                        </div>
                        <div className="col-12">
                        <span>Left: </span>
                        <span
                            dangerouslySetInnerHTML={{
                            __html:
                                timeLog[
                                workOrderFields.timelog.WORKSITE_LEAVE
                                ]
                            }}
                        />
                        </div>
                        <div className="col-12">
                        <span>Returned: </span>
                        <span
                            dangerouslySetInnerHTML={{
                            __html:
                                timeLog[
                                workOrderFields.timelog.WORKSITE_SHOP_RETURN
                                ]
                            }}
                        />
                        </div>
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
                className="atd-spinner"
                />
            </div>

            )}
        </div>

    );
}
 
export default TimeLog;