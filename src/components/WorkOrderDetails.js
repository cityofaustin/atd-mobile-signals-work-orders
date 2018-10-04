import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faWrench,
  faInfoCircle,
  faEdit,
  faCamera,
  faPaperclip,
  faBarcode,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import api from "../queries/api";
import {
  workOrderFields,
  workOrdersDetailsFields,
  workOrderHeaderFields,
  workOrderTimeLogFields
} from "../queries/fields";
import { signalsWorkOrderStatuses } from "../constants/statuses";

class WorkOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleData: false,
      detailsData: false,
      timeLogData: false,
      inventoryData: false,
      imagesData: false
    };
  }

  componentDidMount() {
    this.requestTitle();
    this.requestDetails();
    this.requestTimeLogs();
  }

  requestTitle = () => {
    api
      .workOrder()
      .getTitle(this.props.workOrderId)
      .then(res => {
        this.setState({ titleData: res.data });
      });
  };

  requestDetails = () => {
    api
      .workOrder()
      .getDetails(this.props.workOrderId)
      .then(res => {
        this.setState({ detailsData: res.data });
      });
  };

  requestTimeLogs = () => {
    api
      .workOrder()
      .getTimeLogs(this.props.workOrderId)
      .then(res => {
        console.log(res);
        this.setState({ timeLogData: res.data.records });
      });
  };

  test = () => {
    api
      .workOrder()
      .test(this.props.workOrderId)
      .then(res => {
        console.log("test", res);
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {this.state.titleData[workOrderHeaderFields.title]}
        </h1>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faInfoCircle} /> Work Order Details
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {workOrdersDetailsFields.map(field => (
                <dl key={Object.values(field)[0]}>
                  <dt>{Object.keys(field)[0]}</dt>
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: this.state.detailsData[Object.values(field)[0]]
                    }}
                  />
                </dl>
              ))}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faClock} /> Time Logs
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.timeLogData.length === 0 && <p>No data</p>}
              {this.state.timeLogData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.timeLogData.map((timeLog, i) => (
                    <li className="list-group-item d-flex row" key={i}>
                      <div className="col-7">
                        <div className="row">
                          <div className="col-12">
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  timeLog[workOrderTimeLogFields.TECHNICIAN]
                              }}
                            />
                          </div>
                          <div
                            className="col-12"
                            dangerouslySetInnerHTML={{
                              __html: timeLog[workOrderTimeLogFields.VEHICLE]
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
                                    workOrderTimeLogFields.ISSUE_RECEIVED_TIME
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
                                    workOrderTimeLogFields.WORKSITE_ARRIVE
                                  ]
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <span>Left: </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  timeLog[workOrderTimeLogFields.WORKSITE_LEAVE]
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <span>Returned: </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  timeLog[
                                    workOrderTimeLogFields.WORKSITE_SHOP_RETURN
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
              {!this.state.timeLogData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faBarcode} /> Inventory
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.inventoryData.length === 0 && <p>No data</p>}
              {this.state.inventoryData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.inventoryData.map((comment, i) => (
                    <li className="list-group-item d-flex row" key={i}>
                      <div className="col-12">{comment.field_2173}</div>
                      <div className="col-6">{comment.field_2190}</div>
                      <div
                        className="col-6"
                        dangerouslySetInnerHTML={{ __html: comment.field_2196 }}
                      >
                        {}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {!this.state.inventoryData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faCamera} /> Images
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.imagesData.length === 0 && <p>No data</p>}
              {this.state.imagesData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.imagesData.map((comment, i) => (
                    <li className="list-group-item d-flex row" key={i}>
                      <div className="col-4">{comment.field_2403}</div>
                      <div className="col-4">{comment.field_2407}</div>
                      <div
                        className="col-4"
                        dangerouslySetInnerHTML={{ __html: comment.field_2406 }}
                      />
                      <div
                        className="col-12"
                        dangerouslySetInnerHTML={{ __html: comment.field_2405 }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {!this.state.imagesData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default WorkOrderDetail;
