import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faSpinner } from "@fortawesome/free-solid-svg-icons";

import api from "../../queries/api";
import { getWorkTypeScheduledWorkOptions } from "../../queries/knackObjectHelpers";
import { newWorkOrderInitialState } from "./formDataInitialState";

import Header from "../Shared/Header";
import { ErrorMessage, SuccessMessage } from "./Alerts";

import {
  ASSET_TYPE_OPTIONS,
  WORK_TYPE_TROUBLE_CALL_OPTIONS,
  FIELDS
} from "./formConfig";

class NewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: newWorkOrderInitialState,
      errors: [],
      isSubmitting: false,
      isSubmitted: false,
      newWorkOrder: null,
      signalOptions: [],
      signalName: "",
      schoolZoneOptions: [],
      schoolZoneName: "",
      cameraOptions: [],
      cameraName: "",
      hazardFlasherOptions: [],
      hazardFlasherName: "",
      dmsOptions: [],
      dmsName: "",
      sensorOptions: [],
      sensorName: "",
      workTypeScheduledWorkOptions: []
    };
    this.delayedGetSignalsOptions = _.debounce(this.getSignalsOptions, 200);
    this.delayedGetCameraOptions = _.debounce(this.getCameraOptions, 200);
    this.handleWorkTypeChange = this.handleWorkTypeChange.bind(this);
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  handleWorkTypeChange = e => {
    let formData = this.state.formData;
    formData[FIELDS.WORK_TYPE_TROUBLE_CALL] = "";
    formData[FIELDS.WORK_TYPE_SCHEDULED_WORK] = [];
    this.setState({
      formData,
      workTypeScheduledWorkOptions: getWorkTypeScheduledWorkOptions(
        this.props.knackObject
      )
    });

    this.handleChange(e);
  };

  handleReactMultiSelectChange = values => {
    let formData = this.state.formData;
    formData[FIELDS.WORK_TYPE_SCHEDULED_WORK] = values.map(item => item.value);
    this.setState({ formData });
  };

  getSignalsOptions = searchValue => {
    api
      .workOrder()
      .signals(searchValue)
      .then(res => {
        this.setState({ signalOptions: res.data.records });
      });
  };

  getCameraOptions = searchValue => {
    api
      .workOrder()
      .cameras(searchValue)
      .then(res => {
        this.setState({ cameraOptions: res.data.records });
      });
  };

  getSchoolZoneOptions = () => {
    api
      .workOrder()
      .schoolZones()
      .then(res => {
        this.setState({ schoolZoneOptions: res.data.records });
      });
  };

  getHazardFlasherOptions = () => {
    api
      .workOrder()
      .hazardFlashers()
      .then(res => {
        this.setState({ hazardFlasherOptions: res.data.records });
      });
  };

  getDmsOptions = () => {
    api
      .workOrder()
      .dmses()
      .then(res => {
        this.setState({ dmsOptions: res.data.records });
      });
  };

  getSensorOptions = () => {
    api
      .workOrder()
      .sensors()
      .then(res => {
        this.setState({ sensorOptions: res.data.records });
      });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });
    api
      .workOrder()
      .new(this.state.formData)
      .then(res => {
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          newWorkOrder: res.data.record
        });
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false
        });
      });
  };

  handleSignalChange = e => {
    e.persist();
    this.setState({ signalName: e.target.value }, () =>
      this.delayedGetSignalsOptions(e.target.value)
    );
  };

  handleCameraChange = e => {
    e.persist();
    this.setState({ cameraName: e.target.value }, () =>
      this.delayedGetCameraOptions(e.target.value)
    );
  };

  componentDidMount() {
    this.getSchoolZoneOptions();
    this.getSignalsOptions(this.state.signalName);
    this.getCameraOptions(this.state.cameraName);
    this.getHazardFlasherOptions();
    this.getDmsOptions();
    this.getSensorOptions();
  }

  render() {
    if (!!this.state.newWorkOrder) {
      return (
        <Redirect to={`/work-order/edit-new/${this.state.newWorkOrder.id}`} />
      );
    }

    return (
      <div>
        <Header icon={faWrench} title="New Work Order" />

        {this.state.isSubmitted && (
          <SuccessMessage newWorkOrder={this.state.newWorkOrder} />
        )}

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm}>
          {/* ASSET_TYPE */}
          <div className="form-group">
            <label htmlFor={FIELDS.ASSET_TYPE}>Asset Type</label>
            <select
              className="form-control"
              id={FIELDS.ASSET_TYPE}
              name={FIELDS.ASSET_TYPE}
              onChange={this.handleChange}
              defaultValue={this.state.formData[FIELDS.ASSET_TYPE]}
            >
              {ASSET_TYPE_OPTIONS.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Autocomplete for Signals */}
          {this.state.formData[FIELDS.ASSET_TYPE] === "Signal" && (
            <div className="form-group">
              <label htmlFor={FIELDS.ASSETS["Signal"].fieldId}>
                {FIELDS.ASSETS["Signal"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.signalOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["Signal"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.signalName}
                onChange={this.handleSignalChange}
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[FIELDS.ASSETS["Signal"].fieldId] = value;
                  this.setState({ formData, signalName: item.identifier });
                }}
              />
            </div>
          )}

          {/* Autocomplete for Cameras */}
          {this.state.formData[FIELDS.ASSET_TYPE] === "Camera" && (
            <div className="form-group">
              <label htmlFor={FIELDS.ASSETS["Camera"].fieldId}>
                {FIELDS.ASSETS["Camera"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.cameraOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["Camera"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.cameraName}
                onChange={this.handleCameraChange}
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[FIELDS.ASSETS["Camera"].fieldId] = value;
                  this.setState({ formData, cameraName: item.identifier });
                }}
              />
            </div>
          )}

          {/* Autocomplete for School Zones */}
          {this.state.formData[FIELDS.ASSET_TYPE] === "School Beacon" && (
            <div className="form-group">
              <label htmlFor={FIELDS.ASSETS["School Beacon"].fieldId}>
                {FIELDS.ASSETS["School Beacon"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.schoolZoneOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["School Beacon"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.schoolZoneName}
                onChange={e =>
                  this.setState({ schoolZoneName: e.target.value })
                }
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[FIELDS.ASSETS["School Beacon"].fieldId] = value;
                  this.setState({ formData, schoolZoneName: item.identifier });
                }}
              />
            </div>
          )}

          {/* Autocomplete for Hazard Flasher */}
          {this.state.formData[FIELDS.ASSET_TYPE] === "Hazard Flasher" && (
            <div className="form-group">
              <label htmlFor={FIELDS.ASSETS["Hazard Flasher"].fieldId}>
                {FIELDS.ASSETS["Hazard Flasher"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.hazardFlasherOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["Hazard Flasher"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.hazardFlasherName}
                onChange={e =>
                  this.setState({ hazardFlasherName: e.target.value })
                }
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[FIELDS.ASSETS["Hazard Flasher"].fieldId] = value;
                  this.setState({
                    formData,
                    hazardFlasherName: item.identifier
                  });
                }}
              />
            </div>
          )}

          {/* Autocomplete for DMS */}
          {this.state.formData[FIELDS.ASSET_TYPE] ===
            "Digital Messaging Sign (DMS)" && (
            <div className="form-group">
              <label
                htmlFor={FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId}
              >
                {FIELDS.ASSETS["Digital Messaging Sign (DMS)"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.dmsOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.dmsName}
                onChange={e => this.setState({ dmsName: e.target.value })}
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[
                    FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId
                  ] = value;
                  this.setState({
                    formData,
                    dmsName: item.identifier
                  });
                }}
              />
            </div>
          )}

          {/* Autocomplete for Sensor */}
          {this.state.formData[FIELDS.ASSET_TYPE] === "Sensor" && (
            <div className="form-group">
              <label htmlFor={FIELDS.ASSETS["Sensor"].fieldId}>
                {FIELDS.ASSETS["Sensor"].label}
              </label>
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.sensorOptions}
                inputProps={{
                  className: "form-control",
                  name: FIELDS.ASSETS["Sensor"].fieldId,
                  placeholder: "Type to search..."
                }}
                wrapperStyle={{ display: "block" }}
                menuStyle={{
                  borderRadius: "3px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.9)",
                  padding: "2px 0",
                  fontSize: "120%",
                  position: "fixed",
                  overflow: "auto",
                  zIndex: "999",
                  maxHeight: "50%"
                }}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "2px 5px"
                    }}
                  >
                    {item.identifier}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.identifier.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                value={this.state.sensorName}
                onChange={e => this.setState({ sensorName: e.target.value })}
                onSelect={(value, item) => {
                  let formData = this.state.formData;
                  formData[FIELDS.ASSETS["Sensor"].fieldId] = value;
                  this.setState({
                    formData,
                    sensorName: item.identifier
                  });
                }}
              />
            </div>
          )}

          {/* WORK_TYPE */}
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_TYPE}>Work Type</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={FIELDS.WORK_TYPE}
                id="field_1004_Trouble_Call"
                value="Trouble Call"
                checked={
                  this.state.formData[FIELDS.WORK_TYPE] === "Trouble Call"
                }
                onChange={this.handleWorkTypeChange}
              />
              <label
                className="form-check-label"
                htmlFor="field_1004_Trouble_Call"
              >
                Trouble Call
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={FIELDS.WORK_TYPE}
                id="field_1004_Scheduled_Work"
                value="Scheduled Work"
                checked={
                  this.state.formData[FIELDS.WORK_TYPE] === "Scheduled Work"
                }
                onChange={this.handleWorkTypeChange}
              />
              <label
                className="form-check-label"
                htmlFor="field_1004_Scheduled_Work"
              >
                Scheduled Work
              </label>
            </div>
          </div>

          {this.state.formData[FIELDS.WORK_TYPE] === "Trouble Call" ? (
            // {/* WORK_TYPE_TROUBLE_CALL */}
            <div className="form-group">
              <label htmlFor={FIELDS.WORK_TYPE_TROUBLE_CALL}>
                Trouble Call Type
              </label>
              <select
                className="form-control"
                name={FIELDS.WORK_TYPE_TROUBLE_CALL}
                id={FIELDS.WORK_TYPE_TROUBLE_CALL}
                onChange={this.handleChange}
              >
                <option value="">Select...</option>
                {WORK_TYPE_TROUBLE_CALL_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // {/* WORK_TYPE_SCHEDULED_WORK */}
            <div className="form-group">
              <label htmlFor={FIELDS.WORK_TYPE_SCHEDULED_WORK}>
                Scheduled Work Type
              </label>
              <Select
                defaultValue={[]}
                isMulti
                name={FIELDS.WORK_TYPE_SCHEDULED_WORK}
                options={this.state.workTypeScheduledWorkOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleReactMultiSelectChange}
              />
            </div>
          )}

          {/* WORK_TYPE_OTHER */}
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_TYPE_OTHER}>Work Type Other</label>
            <textarea
              className="form-control"
              name={FIELDS.WORK_TYPE_OTHER}
              id={FIELDS.WORK_TYPE_OTHER}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {this.state.isSubmitting ? (
              <FontAwesomeIcon
                icon={faSpinner}
                size="2x"
                className="atd-spinner"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    );
  }
}

export default NewWorkOrder;
