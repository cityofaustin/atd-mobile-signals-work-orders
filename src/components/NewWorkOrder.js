import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";
import {
  ASSET_TYPE_OPTIONS,
  SCHOOL_ZONES,
  WORK_TYPE_TROUBLE_CALL_OPTIONS,
  WORK_TYPE_SCHEDULED_WORK_OPTIONS
} from "../constants/newWorkOrderFormConfig";

const fields = {
  ASSET_TYPE: "field_977",
  SCHOOL_ZONE: "field_1871",
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
        field_1871: [],
        field_1004: "Trouble Call",
        field_976: "",
        field_900: null,
        field_1420: ""
      }
    };
  }
  submitForm = e => {
    e.preventDefault();
    api
      .workOrder()
      .new(this.state.formData)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} /> New Work Order
        </h1>
        <form onSubmit={this.submitForm}>
          {/* ASSET_TYPE */}
          <div className="form-group">
            <label htmlFor={fields.ASSET_TYPE}>Asset Type</label>
            <select
              className="form-control"
              id={fields.ASSET_TYPE}
              name={fields.ASSET_TYPE}
            >
              {ASSET_TYPE_OPTIONS.map(option => (
                <option value={option} selected="">
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* SCHOOL_ZONE */}
          {/* TODO: search select UI component */}
          <div className="form-group">
            <label htmlFor={fields.SCHOOL_ZONE}>School Zone</label>
            <select
              className="form-control"
              id={fields.SCHOOL_ZONE}
              name={fields.SCHOOL_ZONE}
            >
              {SCHOOL_ZONES.map(zone => (
                <option value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>

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
                checked
              />
              <label className="form-check-label" for="field_1004_Trouble_Call">
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
              />
              <label
                className="form-check-label"
                for="field_1004_Scheduled_Work"
              >
                Scheduled Work
              </label>
            </div>
          </div>

          {/* WORK_TYPE_TROUBLE_CALL */}
          <div className="form-group">
            <label htmlFor={fields.WORK_TYPE_TROUBLE_CALL}>
              Work Type Trouble Call
            </label>
            <select
              className="form-control"
              name={fields.WORK_TYPE_TROUBLE_CALL}
              id={fields.WORK_TYPE_TROUBLE_CALL}
            >
              <option value="" selected="">
                Select...
              </option>
              {WORK_TYPE_TROUBLE_CALL_OPTIONS.map(option => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* WORK_TYPE_SCHEDULED_WORK */}
          {/* TODO: Mulitselect + Search UI */}
          <div className="form-group">
            <label htmlFor={fields.WORK_TYPE_SCHEDULED_WORK}>
              Work Type Scheduled Work
            </label>
            <select
              className="form-control"
              name={fields.WORK_TYPE_SCHEDULED_WORK}
              id={fields.WORK_TYPE_SCHEDULED_WORK}
            >
              {WORK_TYPE_SCHEDULED_WORK_OPTIONS.map(option => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* WORK_TYPE_OTHER */}
          <div className="form-group">
            <label htmlFor={fields.WORK_TYPE_OTHER}>Work Type Other</label>
            <textarea
              className="form-control"
              name={fields.WORK_TYPE_OTHER}
              id={fields.WORK_TYPE_OTHER}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewWorkOrder;
