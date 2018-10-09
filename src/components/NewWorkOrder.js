import React, { Component } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faSpinner } from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";
import {
  ASSET_TYPE_OPTIONS,
  SCHOOL_ZONE_OPTIONS,
  WORK_TYPE_TROUBLE_CALL_OPTIONS,
  WORK_TYPE_SCHEDULED_WORK_OPTIONS
} from "../constants/newWorkOrderFormConfig";

const fields = {
  ASSET_TYPE: "field_977",
  ASSETS: {
    Signal: {
      fieldId: "field_1060",
      label: "Signal",
      options: [
        {
          id: "hi",
          name: "hi"
        },
        { id: "ho", name: "ho" }
      ] // TODO
    },
    Camera: {
      fieldId: "field_1862",
      label: "Camera",
      options: [] // TODO
    },
    "School Beacon": {
      fieldId: "field_1871",
      label: "School Zone",
      options: SCHOOL_ZONE_OPTIONS
    },
    "Hazard Flasher": {
      fieldId: "field_1864",
      label: "Hazard Flasher",
      options: [] // TODO
    },
    "Digital Messaging Sign (DMS)": {
      fieldId: "field_1859",
      label: "DMS",
      options: [] // TODO
    },
    Sensor: {
      fieldId: "field_1863",
      label: "Sensor",
      options: [] // TODO
    }
  },
  WORK_TYPE: "field_1004",
  WORK_TYPE_TROUBLE_CALL: "field_976",
  WORK_TYPE_SCHEDULED_WORK: "field_900",
  WORK_TYPE_OTHER: "field_1420"
};

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
      newWorkOrder: {}
    };
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
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

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} /> New Work Order
        </h1>

        {this.state.errors &&
          this.state.errors.map(error => (
            <div className="alert alert-danger" role="alert" key={error.field}>
              <p style={{ color: "red" }}>{error.message}</p>
            </div>
          ))}

        {this.state.isSubmitted && (
          <div className="alert alert-success" role="alert">
            <p>
              <Link
                to={`/work-orders/${this.state.newWorkOrder.id}`}
                className="alert-link"
              >
                New Work Order
              </Link>{" "}
              successfully created!
            </p>
          </div>
        )}

        <form onSubmit={this.submitForm}>
          {/* ASSET_TYPE */}
          <div className="form-group">
            <label htmlFor={fields.ASSET_TYPE}>Asset Type</label>
            <select
              className="form-control"
              id={fields.ASSET_TYPE}
              name={fields.ASSET_TYPE}
              onChange={this.handleChange}
              defaultValue={this.state.formData[fields.ASSET_TYPE]}
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
          {this.state.formData[fields.ASSET_TYPE] !== "Other / No Asset" && (
            <div className="form-group">
              <label
                htmlFor={
                  fields.ASSETS[this.state.formData[fields.ASSET_TYPE]].fieldId
                }
              >
                {fields.ASSETS[this.state.formData[fields.ASSET_TYPE]].label}
              </label>
              <select
                className="form-control"
                id={
                  fields.ASSETS[this.state.formData[fields.ASSET_TYPE]].fieldId
                }
                name={
                  fields.ASSETS[this.state.formData[fields.ASSET_TYPE]].fieldId
                }
                onChange={this.handleChange}
              >
                {fields.ASSETS[
                  this.state.formData[fields.ASSET_TYPE]
                ].options.map(option => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* WORK_TYPE */}
          <div className="form-group">
            <label htmlFor={fields.WORK_TYPE}>Work Type</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={fields.WORK_TYPE}
                id="field_1004_Trouble_Call"
                value="Trouble Call"
                checked={
                  this.state.formData[fields.WORK_TYPE] === "Trouble Call"
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
                name={fields.WORK_TYPE}
                id="field_1004_Scheduled_Work"
                value="Scheduled Work"
                checked={
                  this.state.formData[fields.WORK_TYPE] === "Scheduled Work"
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

          {this.state.formData[fields.WORK_TYPE] === "Trouble Call" ? (
            // {/* WORK_TYPE_TROUBLE_CALL */}
            <div className="form-group">
              <label htmlFor={fields.WORK_TYPE_TROUBLE_CALL}>
                Work Type Trouble Call
              </label>
              <select
                className="form-control"
                name={fields.WORK_TYPE_TROUBLE_CALL}
                id={fields.WORK_TYPE_TROUBLE_CALL}
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
              <label htmlFor={fields.WORK_TYPE_SCHEDULED_WORK}>
                Work Type Scheduled Work
              </label>
              <select
                className="form-control"
                name={fields.WORK_TYPE_SCHEDULED_WORK}
                id={fields.WORK_TYPE_SCHEDULED_WORK}
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
            <label htmlFor={fields.WORK_TYPE_OTHER}>Work Type Other</label>
            <textarea
              className="form-control"
              name={fields.WORK_TYPE_OTHER}
              id={fields.WORK_TYPE_OTHER}
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
