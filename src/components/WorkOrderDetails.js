import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InventoryItemTable from "./WorkOrder/InventoryItemTable";
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

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import TimeLog from "./WorkOrder/TimeLog";
import NewTimeLog from "./WorkOrder/NewTimeLog";
import WorkSpecifications from "./WorkOrder/WorkSpecifications";
import UploadImage from "./WorkOrder/UploadImage";
import api from "../queries/api";
import { workOrderFields as FIELDS } from "../queries/fields";
import {
  getWorkOrderTitle,
  getWorkOrderDetailAndTimeLogs,
} from "./WorkOrder/helpers";
import InventoryItems from "./WorkOrder/InventoryItems";

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
      atdWorkOrderId: "",
      isAddingInventoryItem: false,
      isEditingInventoryItem: false,
      itemSelectedForEdit: "",
      isAddingTimeLog: false,
      isEditingTimeLog: false,
      timeLogSelectedforEdit: null,
    };

    // Split the Details fields in two so we can display them side by side and
    // save some screen real estate
    this.halfDetails = Math.ceil(FIELDS.details.length / 2);
    this.detailsFirstHalf = FIELDS.details.slice(0, this.halfDetails);
    this.detailsSecondHalf = FIELDS.details.slice(this.halfDetails);
    this.workOrderId = this.props.match.params.workOrderId;
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

    getWorkOrderTitle(this.workOrderId).then(data => {
      this._isMounted && this.setState({ titleData: data });
    });
    getWorkOrderDetailAndTimeLogs(this.workOrderId).then(data => {
      this._isMounted && this.setState({ detailsData: data });
      // Need to retrieve ATD Work Order ID from details in order to req associated inv. items
      const atdWorkOrderId = data[FIELDS.details["Work Order ID"]];
      // Save atdWorkOrderId for refetching data after inventory updates
      this.setState({ atdWorkOrderId });
      setTimeout(this.requestInventory, 1500, atdWorkOrderId);
    });
    api
      .user()
      .getInfo()
      .then(res => {
        this._isMounted && this.setState({ userInfo: res.data });
      });
    // Stagger the calls to Knack API so we don't get rate limited.
    setTimeout(this.requestTimeLogs, 500, this.workOrderId);
    setTimeout(this.requestImages, 1000, this.workOrderId);
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
    const assetUrlFromKnack = this.state.detailsData[FIELDS.assetIdFromDetails];
    const assetId =
      assetUrlFromKnack !== "" && assetUrlFromKnack.match(/href="#(.*?)">/)[1];
    return assetId;
  };

  renderSignalDetailsLink = () =>
    // Only render link if asset type is Signal
    this.state.detailsData["field_977"] === "Signal" && (
      <Link
        to={`/work-orders/${
          this.workOrderId
        }/assets/${this.getAssetIdFromKnackLink()}`}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} /> {"View Signal Details"}
      </Link>
    );

  handleReopenClick = e => {
    e.preventDefault();
    const workOrderId = this.workOrderId;
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

  handleAddInventoryItem = () => this.setState({ isAddingInventoryItem: true });

  handleEditInventoryItem = inventoryItemId => {
    this.setState({
      itemSelectedforEdit: inventoryItemId,
      isEditingInventoryItem: true,
    });
  };

  handleAddTimeLog = () => this.setState({ isAddingTimeLog: true });

  handleEditTimeLog = timeLogId => {
    this.setState({
      timeLogSelectedForEdit: timeLogId,
      isEditingTimeLog: true,
    });
  };

  restoreTimeLogTable = () => {
    this.setState(
      {
        isEditingTimeLog: false,
        isAddingTimeLog: false,
      },
      () => {
        this.requestTimeLogs(this.workOrderId);
      }
    );
  };

  handleTimeLogFormCancel = () => {
    this.setState({
      isEditingTimeLog: false,
      isAddingTimeLog: false,
    });
  };

  restoreInventoryTable = () => {
    // Clear item selected, turn off adding and editing, then refetch inventory
    this.setState(
      {
        itemSelectedforEdit: "",
        isEditingInventoryItem: false,
        isAddingInventoryItem: false,
      },
      () => {
        this.requestInventory(this.state.atdWorkOrderId);
      }
    );
  };

  isWorkOrderAssignedToUserLoggedIn = () => {
    const userId = this.state.userInfo.id;
    const usersArray = this.state.detailsData[
      FIELDS.baseFields.leadTechnicianRaw
    ];
    return usersArray && userId
      ? usersArray.find(user => user.id === userId)
      : false;
  };

  displayReopenButton = () =>
    this.state.isSubmitting ? (
      <FontAwesomeIcon
        icon={faSpinner}
        className="atd-spinner--padded"
        size="2x"
      />
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

  render() {
    const statusField = this.state.detailsData[FIELDS.baseFields.status];
    const workOrderId = this.workOrderId;

    const {
      isAddingInventoryItem,
      isEditingInventoryItem,
      itemSelectedforEdit,
      isAddingTimeLog,
      isEditingTimeLog,
      timeLogSelectedForEdit,
    } = this.state;
    return (
      <div>
        <StyledPageTitle>
          <PageTitle
            icon={faWrench}
            title={this.state.titleData[FIELDS.header]}
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
              {!isAddingTimeLog &&
                !isEditingTimeLog && (
                  <TimeLog
                    data={this.state.timeLogData}
                    workOrderId={workOrderId}
                    handleAddTimeLog={this.handleAddTimeLog}
                    handleEditTimeLog={this.handleEditTimeLog}
                  />
                )}
              {(isAddingTimeLog ||
                (isEditingTimeLog && timeLogSelectedForEdit)) && (
                <NewTimeLog
                  workOrderId={workOrderId}
                  isAddingTimeLog={isAddingTimeLog}
                  isEditingTimeLog={isEditingTimeLog}
                  restoreTimeLogTable={this.restoreTimeLogTable}
                  handleTimeLogFormCancel={this.handleTimeLogFormCancel}
                  timeLogSelectedForEdit={timeLogSelectedForEdit}
                />
              )}
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
            <AccordionItemBody
              style={
                !isAddingInventoryItem && !isEditingInventoryItem
                  ? { padding: "0px" }
                  : {}
              }
            >
              {/* If editing or adding item, render InventoryItems component with child forms for either case */}
              {!isAddingInventoryItem &&
                !isEditingInventoryItem && (
                  <InventoryItemTable
                    inventoryData={this.state.inventoryData}
                    atdWorkOrderId={this.state.atdWorkOrderId}
                    workOrderId={workOrderId}
                    requestInventory={this.requestInventory}
                    handleAddInventoryItem={this.handleAddInventoryItem}
                    handleEditInventoryItem={this.handleEditInventoryItem}
                  />
                )}
              {(isAddingInventoryItem || isEditingInventoryItem) && (
                <InventoryItems
                  isEditing={isEditingInventoryItem}
                  itemSelectedforEdit={itemSelectedforEdit}
                  restoreInventoryTable={this.restoreInventoryTable}
                  workOrderId={workOrderId}
                />
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
                        {image[FIELDS.images.DATESTAMP]}
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
                    className="atd-spinner--padded"
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
