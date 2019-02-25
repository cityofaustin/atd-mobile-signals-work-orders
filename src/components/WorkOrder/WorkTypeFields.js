import React, { Component } from "react";
import Select from "react-select";

import { WORK_TYPE_TROUBLE_CALL_OPTIONS, FIELDS } from "./formConfig";
import { getWorkTypeScheduledWorkOptions } from "../../queries/knackObjectHelpers";

export default class WorkTypeFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: props.values,
      workTypeScheduledWorkOptions: getWorkTypeScheduledWorkOptions(
        window.Knack
      )
    };
    this.handleWorkTypeChange = this.handleWorkTypeChange.bind(this);
  }

  componentDidMount = () => {
    this.setState({ formData: this.props.values });
  };

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
        window.Knack
      )
    });

    this.handleChange(e);
  };

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    debugger;
    let formData = this.state.formData;
    formData[name] = values.map(item => item.value);
    this.setState({ formData });
  };

  render() {
    return (
      <div>
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
              checked={this.state.formData[FIELDS.WORK_TYPE] === "Trouble Call"}
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
              Problem Reported
            </label>
            <select
              className="form-control"
              name={FIELDS.WORK_TYPE_TROUBLE_CALL}
              id={FIELDS.WORK_TYPE_TROUBLE_CALL}
              onChange={this.handleChange}
              value={this.state.formData[FIELDS.WORK_TYPE_TROUBLE_CALL]}
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
              Scheduled Work Task(s)
            </label>
            <Select
              defaultValue={[]}
              isMulti
              name={FIELDS.WORK_TYPE_SCHEDULED_WORK}
              options={this.state.workTypeScheduledWorkOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleReactMultiSelectChange.bind(
                this,
                FIELDS.WORK_TYPE_SCHEDULED_WORK
              )}
            />
          </div>
        )}
        {/* WORK_TYPE_OTHER */}
        {(this.state.formData[FIELDS.WORK_TYPE_TROUBLE_CALL] === "Other" ||
          this.state.formData[FIELDS.WORK_TYPE_SCHEDULED_WORK].includes(
            "Other"
          )) && (
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_TYPE_OTHER}>Work Type Other</label>
            <textarea
              className="form-control"
              name={FIELDS.WORK_TYPE_OTHER}
              id={FIELDS.WORK_TYPE_OTHER}
              onChange={this.handleChange}
            />
          </div>
        )}
      </div>
    );
  }
}
