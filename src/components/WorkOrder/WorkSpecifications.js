import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FIELDS } from "./formConfig";

export default class WorkSpecifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedFormData: {},
    };
  }

  handleChange = e => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[e.target.name] = e.target.value;
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );
    updatedAllData[`${e.target.name}_raw`] = "";
    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <div class="form-group">
            <label htmlFor={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}>
              Problem found
            </label>
            <textarea
              class="form-control"
              id={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}
              name={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}
              rows="3"
              onChange={this.handleChange}
              defaultValue={
                this.state.updatedFormData[
                  FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND
                ]
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}>
              Task orders
            </label>
            <select name="" id=""></select>
          </div>
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}>
              Action taken
            </label>
            <textarea
              class="form-control"
              id={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
              name={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
              rows="3"
              onChange={this.handleChange}
              defaultValue={
                this.state.updatedFormData[
                  FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN
                ]
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor={FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}>
              Checked All Peds, Colors, Buttons, Detection, Program
            </label>
            <select name="" id=""></select>
          </div>
        </form>
      </div>
    );
  }
}
