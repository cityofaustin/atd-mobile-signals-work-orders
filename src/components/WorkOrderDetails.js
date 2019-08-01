import React, { Component } from "react";
import Button from "./Form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faWrench,
  faInfoCircle,
  faCamera,
  faBarcode,
  faSpinner,
  faEdit,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import TimeLog from "./WorkOrder/TimeLog";
import api from "../queries/api";
import { workOrderFields } from "../queries/fields";
import { getWorkOrderDetails, getWorkOrderTitle } from "./WorkOrder/helpers";

class WorkOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleData: false,
      detailsData: false,
      timeLogData: false,
      inventoryData: false,
      imagesData: false,
    };

    // Split the Details fields in two so we can display them side by side and
    // save some screen real estate
    this.halfDetails = Math.ceil(workOrderFields.details.length / 2);
    this.detailsFirstHalf = workOrderFields.details.slice(0, this.halfDetails);
    this.detailsSecondHalf = workOrderFields.details.slice(
      this.halfDetails,
      -1
    );
  }

  componentDidMount() {
    const { workOrderId } = this.props.match.params;
    getWorkOrderTitle(workOrderId).then(data => {
      this.setState({ titleData: data });
    });
    getWorkOrderDetails(workOrderId).then(data => {
      this.setState({ detailsData: data });
    });
    // Stagger the calls to Knack API so we don't get rate limited.
    setTimeout(this.requestTimeLogs, 500, workOrderId);
    setTimeout(this.requestInventory, 1000, workOrderId);
    setTimeout(this.requestImages, 1500, workOrderId);
  }

  requestTimeLogs = id => {
    api
      .workOrder()
      .getTimeLogs(id)
      .then(res => this.setState({ timeLogData: res.data.records }));
  };

  requestInventory = id => {
    api
      .workOrder()
      .getInventory(id)
      .then(res => {
        console.log(res);
        this.setState({ inventoryData: res.data.records });
      });
  };

  requestImages = id => {
    api
      .workOrder()
      .getImages(id)
      .then(res => {
        console.log(res);
        this.setState({ imagesData: res.data.records });
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {this.state.titleData[workOrderFields.header]}
        </h1>
        <div className="d-flex flex-row flex-wrap">
          <Button
            icon={faEdit}
            text={"Edit"}
            linkPath={`/work-order/edit/${this.props.match.params.workOrderId}`}
          />
          {this.state.timeLogData.length > 0 ? (
            <Button
              icon={faFlagCheckered}
              text={"Submit"}
              linkPath={`/work-order/submit/${
                this.props.match.params.workOrderId
              }`}
            />
          ) : (
            <div className="mr-2 mb-2">
              <div className="btn btn-secondary btn-lg disabled" disabled>
                <FontAwesomeIcon icon={faFlagCheckered} /> Submit
              </div>
            </div>
          )}
        </div>
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
                          ],
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
                          ],
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
              <Button
                icon={faClock}
                text={"New Time Log"}
                linkPath={`/work-order/new-time-log/${
                  this.props.match.params.workOrderId
                }`}
              />
              <TimeLog data={this.state.timeLogData} />
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
              <Button
                icon={faWrench}
                text={"New Item"}
                linkPath={`/work-order/inventory-items/${
                  this.props.match.params.workOrderId
                }`}
              />
              {this.state.inventoryData.length === 0 && <p>No data</p>}
              {this.state.inventoryData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.inventoryData.map((inventory, i) => (
                    <li className="list-group-item d-flex row" key={i}>
                      <div className="col-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              inventory[
                                workOrderFields.inventory.INVENTORY_ITEM
                              ],
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-4">
                            {inventory[workOrderFields.inventory.STATUS]}
                          </div>
                          <div className="col-4">
                            <span>Quantity: </span>
                            {inventory[workOrderFields.inventory.QUANTITY]}
                          </div>
                          <div className="col-4">
                            <span>Condition: </span>
                            {inventory[workOrderFields.inventory.CONDITION]}
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
              <Button
                icon={faCamera}
                text={"New Image"}
                linkPath={`/work-order/add-image/${
                  this.props.match.params.workOrderId
                }`}
              />
              {this.state.imagesData.length === 0 && <p>No data</p>}
              {this.state.imagesData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.imagesData.map((image, i) => (
                    <li
                      className="list-group-item d-flex row"
                      key={i}
                      style={{ textAlign: "center" }}
                    >
                      <div className="col-12 img-fluid">
                        <img
                          alt="capture from webcam"
                          className="img-fluid"
                          src={image.field_1047_raw.url}
                        />
                      </div>
                      <div className="col-12">
                        <span style={{ fontStyle: "italic" }}>
                          Uploaded at:{" "}
                        </span>
                        {image[workOrderFields.images.DATESTAMP]}
                      </div>
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
