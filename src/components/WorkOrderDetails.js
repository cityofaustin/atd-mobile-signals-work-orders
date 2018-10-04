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
  workOrderTimeLogFields,
  workOrderInventoryFields
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

    // Split the Details fields into two so we can display them side by side and
    // save some screen real estate
    this.halfDetails = Math.ceil(workOrdersDetailsFields.length / 2);
    this.detailsFirstHalf = workOrdersDetailsFields.slice(0, this.halfDetails);
    this.detailsSecondHalf = workOrdersDetailsFields.slice(
      this.halfDetails,
      -1
    );
  }

  componentDidMount() {
    this.requestTitle();
    this.requestDetails();
    this.requestTimeLogs();
    this.requestInventory();
    // this.test();
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
        this.setState({ timeLogData: res.data.records });
      });
  };

  requestInventory = () => {
    api
      .workOrder()
      .getInventory(this.props.workOrderId)
      .then(res => {
        console.log("inventory", res.data.records);
        this.setState({ inventoryData: res.data.records });
      });
  };

  test = () => {
    api
      .workOrder()
      .test(this.props.workOrderId)
      .then(res => {
        console.log("test", res.data.records);
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
              <div className="row">
                <div className="col-6">
                  {this.detailsFirstHalf.map(field => (
                    <dl key={Object.values(field)[0]}>
                      <dt>{Object.keys(field)[0]}</dt>
                      <dd
                        dangerouslySetInnerHTML={{
                          __html: this.state.detailsData[
                            Object.values(field)[0]
                          ]
                        }}
                      />
                    </dl>
                  ))}
                </div>
                <div className="col-6">
                  {this.detailsSecondHalf.map(field => (
                    <dl key={Object.values(field)[0]}>
                      <dt>{Object.keys(field)[0]}</dt>
                      <dd
                        dangerouslySetInnerHTML={{
                          __html: this.state.detailsData[
                            Object.values(field)[0]
                          ]
                        }}
                      />
                    </dl>
                  ))}
                </div>
              </div>
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
                  {this.state.inventoryData.map((inventory, i) => (
                    <li className="list-group-item d-flex row" key={i}>
                      <div className="col-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              inventory[workOrderInventoryFields.INVENTORY_ITEM]
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-4">
                            {inventory[workOrderInventoryFields.STATUS]}
                          </div>
                          <div className="col-4">
                            <span>Quantity: </span>
                            {inventory[workOrderInventoryFields.QUANTITY]}
                          </div>
                          <div className="col-4">
                            <span>Condition: </span>
                            {inventory[workOrderInventoryFields.CONDITION]}
                          </div>
                        </div>
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
