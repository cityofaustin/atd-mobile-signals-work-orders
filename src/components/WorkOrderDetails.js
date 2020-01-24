import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  faMapMarkedAlt,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

import PageTitle from "./Shared/PageTitle";
import { StyledPageTitle } from "../styles/PageTitle.css";
import { WorkOrderInventoryStatus } from "../styles/WorkOrderInventoryStatus";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import TimeLog from "./WorkOrder/TimeLog";
import WorkSpecifications from "./WorkOrder/WorkSpecifications";
import UploadImage from "./WorkOrder/UploadImage";
import api from "../queries/api";
import { workOrderFields } from "../queries/fields";
import {
  getWorkOrderTitle,
  getWorkOrderDetailAndTimeLogs,
} from "./WorkOrder/helpers";

class WorkOrderDetail extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      titleData: false,
      detailsData: false,
      timeLogData: false,
      inventoryData: false,
      imagesData: false,
      userInfo: "",
      isSubmitting: false,
    };

    // Split the Details fields in two so we can display them side by side and
    // save some screen real estate
    this.halfDetails = Math.ceil(workOrderFields.details.length / 2);
    this.detailsFirstHalf = workOrderFields.details.slice(0, this.halfDetails);
    this.detailsSecondHalf = workOrderFields.details.slice(this.halfDetails);
  }

  renderDetailItem(field) {
    const key = Object.values(field)[0];
    const label = Object.keys(field)[0];
    const value = this.state.detailsData[Object.values(field)[0]];

    return (
      <dl key={key}>
        <dt>{label}</dt>
        <dd
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        />
      </dl>
    );
  }

  componentDidMount() {
    window.analytics.page("Work Order Details");

    this._isMounted = true;
    const { workOrderId } = this.props.match.params;
    getWorkOrderTitle(workOrderId).then(data => {
      this._isMounted && this.setState({ titleData: data });
    });
    getWorkOrderDetailAndTimeLogs(workOrderId).then(data => {
      this._isMounted && this.setState({ detailsData: data });

      // Need to retrieve ATD Work Order ID from details in order to req associated inv. items
      const atdWorkOrderId = data.field_1209;
      setTimeout(this.requestInventory, 1500, atdWorkOrderId);
    });
    api
      .user()
      .getInfo()
      .then(res => {
        this._isMounted && this.setState({ userInfo: res.data });
      });
    // Stagger the calls to Knack API so we don't get rate limited.
    setTimeout(this.requestTimeLogs, 500, workOrderId);
    setTimeout(this.requestImages, 1000, workOrderId);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  requestTimeLogs = id => {
    api
      .workOrder()
      .getTimeLogs(id)
      .then(
        res =>
          this._isMounted && this.setState({ timeLogData: res.data.records })
      );
  };

  requestInventory = id => {
    api
      .workOrder()
      .getInventory(id)
      .then(res => {
        this._isMounted && this.setState({ inventoryData: res.data.records });
      });
  };

  requestImages = id => {
    api
      .workOrder()
      .getImages(id)
      .then(res => {
        this._isMounted && this.setState({ imagesData: res.data.records });
      });
  };

  getAssetIdFromKnackLink = () => {
    const assetUrlFromKnack = this.state.detailsData[
      workOrderFields.assetIdFromDetails
    ];
    const assetId =
      assetUrlFromKnack !== "" && assetUrlFromKnack.match(/href="#(.*?)">/)[1];
    return assetId;
  };

  renderSignalDetailsLink = () =>
    // Only render link if asset type is Signal
    this.state.detailsData["field_977"] === "Signal" && (
      <Link
        to={`/work-orders/${
          this.props.match.params.workOrderId
        }/assets/${this.getAssetIdFromKnackLink()}`}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} /> {"View Signal Details"}
      </Link>
    );

  handleReopenClick = e => {
    e.preventDefault();
    const workOrderId = this.props.match.params.workOrderId;
    // To reopen work order, Knack wants payload with ID
    this.setState({ isSubmitting: true });
    api
      .workOrder()
      .reopen(workOrderId, { id: workOrderId })
      .then(() => {
        this.setState({ isSubmitting: true });
        window.location.reload();
      });
  };

  isWorkOrderAssignedToUserLoggedIn = () => {
    const userId = this.state.userInfo.id;
    const usersArray = this.state.detailsData.field_1754_raw;
    return usersArray && userId
      ? usersArray.find(user => user.id === userId)
      : false;
  };

  displayReopenButton = () =>
    this.state.isSubmitting ? (
      <FontAwesomeIcon icon={faSpinner} className="atd-spinner" size="2x" />
    ) : (
      <div className="mr-2 mb-2">
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={this.handleReopenClick}
        >
          <FontAwesomeIcon icon={faRedo} /> Re-Open
        </button>
      </div>
    );

  addWorkOrderStatusClass = status => {
    // Translate status to classname for CSS styling
    const statusClassname = status.split(" ")[0].toLowerCase() || null;
    return !!statusClassname ? statusClassname : "";
  };

  render() {
    const statusField = this.state.detailsData.field_459;
    const workOrderId = this.props.match.params.workOrderId;
    return (
      <div>
        <StyledPageTitle>
          <PageTitle
            icon={faWrench}
            title={this.state.titleData[workOrderFields.header]}
          />
        </StyledPageTitle>
        <h2>{this.renderSignalDetailsLink()}</h2>
        <div className="d-flex flex-row flex-wrap">
          {statusField !== "Submitted" &&
            statusField !== "Closed" &&
            this.isWorkOrderAssignedToUserLoggedIn() && (
              <Button
                icon={faEdit}
                text={"Edit"}
                linkPath={`/work-order/edit/${workOrderId}`}
              />
            )}
          {this.state.timeLogData.length > 0 &&
          statusField !== "Submitted" &&
          statusField === "Assigned" ? (
            <Button
              icon={faFlagCheckered}
              text={"Submit"}
              linkPath={`/work-order/submit/${workOrderId}`}
            />
          ) : (
            <div className="mr-2 mb-2">
              <div className="btn btn-secondary btn-lg disabled" disabled>
                <FontAwesomeIcon icon={faFlagCheckered} /> Submit
              </div>
            </div>
          )}
          {statusField === "Submitted" && this.displayReopenButton()}
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
                  {this.detailsFirstHalf.map(field =>
                    this.renderDetailItem(field)
                  )}
                </div>
                <div className="col-6">
                  {this.detailsSecondHalf.map(field =>
                    this.renderDetailItem(field)
                  )}
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
                linkPath={`/work-order/new-time-log/${workOrderId}`}
              />
              <TimeLog
                data={this.state.timeLogData}
                workOrderId={workOrderId}
              />
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faEdit} /> Work Specifications
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <WorkSpecifications
                data={this.state.detailsData}
                workOrderId={workOrderId}
              />
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
                linkPath={`/work-order/inventory-items/${workOrderId}`}
              />
              {this.state.inventoryData.length === 0 && <p>No data</p>}
              {this.state.inventoryData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.inventoryData.map((inventory, i) => (
                    <WorkOrderInventoryStatus>
                      <li
                        // Add classname to highlight item name by status
                        className={`list-group-item d-flex row ${this.addWorkOrderStatusClass(
                          inventory[workOrderFields.inventory.STATUS]
                        )}`}
                        key={i}
                      >
                        <div className="col">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                inventory[
                                  workOrderFields.inventory.INVENTORY_ITEM
                                ],
                            }}
                          />
                        </div>
                        <div className="col pt-2">
                          <Button
                            icon={faEdit}
                            text={"Edit"}
                            linkPath={`/work-order/${workOrderId}/edit-inventory-item/${
                              inventory.id
                            }`}
                            color={"primary"}
                          />
                        </div>
                        <div className="col-12">
                          {/* Add classname to highlight item attributes by status */}
                          <div
                            className={`row ${this.addWorkOrderStatusClass(
                              inventory[workOrderFields.inventory.STATUS]
                            )}`}
                          >
                            <div className="col-2">
                              <span>Quantity: </span>
                              {inventory[workOrderFields.inventory.QUANTITY]}
                            </div>
                            <div className="col-2">
                              <span>Source: </span>
                              {inventory[workOrderFields.inventory.SOURCE]}
                            </div>
                            <div className="col-2">
                              <span>Issued to: </span>
                              {inventory[workOrderFields.inventory.ISSUED_TO]}
                            </div>
                            <div className="col-2">
                              <span>Comment: </span>
                              {inventory[workOrderFields.inventory.COMMENT]}
                            </div>
                            <div className="col-2">
                              <span>Modified: </span>
                              {inventory[workOrderFields.inventory.MODIFIED]}
                            </div>
                            <div className="col-2">
                              <span>Status: </span>
                              {inventory[workOrderFields.inventory.STATUS]}
                            </div>
                          </div>
                        </div>
                      </li>
                    </WorkOrderInventoryStatus>
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
              <div className="row">
                <Button
                  icon={faCamera}
                  text={"Take Picture"}
                  linkPath={`/work-order/add-image/${workOrderId}`}
                />
                <UploadImage
                  id={workOrderId}
                  requestImages={this.requestImages}
                />
              </div>
              {this.state.imagesData.length === 0 && <p>No images</p>}
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
