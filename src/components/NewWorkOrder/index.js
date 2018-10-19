import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faSpinner } from "@fortawesome/free-solid-svg-icons";

import api from "../../queries/api";
import { colors } from "../../constants/colors";
import {
  ASSET_TYPE_OPTIONS,
  WORK_TYPE_TROUBLE_CALL_OPTIONS,
  WORK_TYPE_SCHEDULED_WORK_OPTIONS,
  FIELDS
} from "./formConfig";

import { ErrorMessage, SuccessMessage } from "./Alerts";

class NewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        field_977: "Signal",
        field_1060: "", // SIGNAL
        field_1862: "", // CAMERA
        field_1871: "", // SCHOOL_ZONE
        field_1864: "", // HAZARD_FLASHER
        field_1859: "", // DMS
        field_1863: "", // SENSOR
        field_1004: "Trouble Call",
        field_976: "",
        field_900: null,
        field_1420: ""
      },
      errors: [],
      isSubmitting: false,
      isSubmitted: false,
      newWorkOrder: {},
      signalOptions: [],
      signalName: "",
      schoolZoneOptions: [],
      schoolZoneName: ""
    };
    this.delayedGetSignalsOptions = _.debounce(this.getSignalsOptions, 200);
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  getSignalsOptions = searchValue => {
    api
      .signals()
      .search(searchValue)
      .then(res => {
        console.log(res);
        this.setState({ signalOptions: res.data.records });
      });
  };

  getSchoolZoneOptions = () => {
    api
      .schoolZones()
      .search()
      .then(res => {
        this.setState({ schoolZoneOptions: res.data.records });
      });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });
    api
      .workOrder()
      .new(this.state.formData)
      .then(res => {
        console.log(res);
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

  componentDidMount() {
    this.getSchoolZoneOptions();
    this.getSignalsOptions(this.state.signalName);
  }

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} /> New Work Order
        </h1>

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

          {/* ASSET ITEM SELECT */}
          {/* // TODO: search select UI component */}
          {this.state.formData[FIELDS.ASSET_TYPE] !== "Other / No Asset" &&
            this.state.formData[FIELDS.ASSET_TYPE] !== "School Beacon" &&
            this.state.formData[FIELDS.ASSET_TYPE] !== "Signal" && (
              <div className="form-group">
                <label
                  htmlFor={
                    FIELDS.ASSETS[this.state.formData[FIELDS.ASSET_TYPE]]
                      .fieldId
                  }
                >
                  {FIELDS.ASSETS[this.state.formData[FIELDS.ASSET_TYPE]].label}
                </label>
                <select
                  className="form-control"
                  id={
                    FIELDS.ASSETS[this.state.formData[FIELDS.ASSET_TYPE]]
                      .fieldId
                  }
                  name={
                    FIELDS.ASSETS[this.state.formData[FIELDS.ASSET_TYPE]]
                      .fieldId
                  }
                  onChange={this.handleChange}
                >
                  {FIELDS.ASSETS[
                    this.state.formData[FIELDS.ASSET_TYPE]
                  ].options.map(option => (
                    <option value={option.id} key={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                Work Type Trouble Call
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
            // {/* TODO: Mulitselect + Search UI */}
            <div className="form-group">
              <label htmlFor={FIELDS.WORK_TYPE_SCHEDULED_WORK}>
                Work Type Scheduled Work
              </label>
              <select
                className="form-control"
                name={FIELDS.WORK_TYPE_SCHEDULED_WORK}
                id={FIELDS.WORK_TYPE_SCHEDULED_WORK}
                onChange={this.handleChange}
              >
                {WORK_TYPE_SCHEDULED_WORK_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
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
