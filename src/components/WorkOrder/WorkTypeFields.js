import React, { Component } from "react";
import Select from "react-select";

import { WORK_TYPE_TROUBLE_CALL_OPTIONS, FIELDS } from "./formConfig";
import { getWorkTypeScheduledWorkOptions } from "../../queries/knackObjectHelpers";

export default class WorkTypeFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      workTypeScheduledWorkOptions: getWorkTypeScheduledWorkOptions(
        window.Knack
      ),
      updatedFormData: {}
    };
    this.handleWorkTypeChange = this.handleWorkTypeChange.bind(this);
  }

  componentDidMount = () => {
    this.setState({ data: this.props.data });
  };

  handleChange = e => {
    let data = {};
    data[e.target.name] = e.target.value;
    this.setState({ updatedFormData: data });
    this.props.handleWorkTypeChange(data);
  };

  handleWorkTypeChange = e => {
    let data = {};
    data[FIELDS.WORK_TYPE_TROUBLE_CALL] = "";
    data[FIELDS.WORK_TYPE_SCHEDULED_WORK] = [];
    this.setState({
      updatedFormData: data,
      workTypeScheduledWorkOptions: getWorkTypeScheduledWorkOptions(
        window.Knack
      )
    });

    this.handleChange(e);
  };

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    let data = {};
    data[name] = values.map(item => item.value);
    this.setState({ data });
    this.props.handleWorkTypeChange(data);
  };

  render() {
    return (
      <div>
        {/* WORK_TYPE */}
        <div className="form-group">
          {/* TODO: a more friendly button interface than radios for Work Type */}
          <label htmlFor={FIELDS.WORK_TYPE}>Work Type</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={FIELDS.WORK_TYPE}
              id="field_1004_Trouble_Call"
              value="Trouble Call"
              checked={this.props.data[FIELDS.WORK_TYPE] === "Trouble Call"}
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
              checked={this.props.data[FIELDS.WORK_TYPE] === "Scheduled Work"}
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
        {this.props.data[FIELDS.WORK_TYPE] === "Trouble Call" ? (
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
              value={this.props.data[FIELDS.WORK_TYPE_TROUBLE_CALL]}
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
              defaultValue={this.props.data[
                `${FIELDS.WORK_TYPE_SCHEDULED_WORK}_raw`
              ].map(item => ({
                value: item,
                label: item
              }))}
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
        {(this.props.data[FIELDS.WORK_TYPE_TROUBLE_CALL] === "Other" ||
          this.props.data[FIELDS.WORK_TYPE_SCHEDULED_WORK].includes(
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
