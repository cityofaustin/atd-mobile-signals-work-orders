import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AsyncSelect from "react-select/lib/Async";
import { FIELDS } from "./formConfig";
import SubmitButton from "../Form/SubmitButton";

import api from "../../queries/api";

export default class WorkSpecifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedFormData: {
        _id: this.props.workOrderId,
      },
      options: [],
      isLoading: false,
      isSubmitting: false,
    };
  }

  handleChange = e => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[e.target.id] = e.target.value;

    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );

    updatedAllData[`${e.target.name}_raw`] = "";
    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  loadTaskOrderOptions = (inputValue, callback) => {
    if (inputValue.length < 2) {
      return inputValue;
    }
    api
      .workOrder()
      .taskOrder(inputValue)
      .then(res => {
        const options = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ options });
        if (this.state[FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS]) {
          options.push(this.state[FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS]);
        }
        return callback(options);
      });
  };

  getTaskOrderValues = () => {
    let values = this.state.updatedFormData[
      FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS
    ];
    if (values === undefined) return [];

    let data = this.state.updatedFormData[
      FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS
    ];
    let rawData = this.state.updatedFormData[
      `${FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}_raw`
    ];

    // handle no Task Orders
    values =
      values === ""
        ? values
        : values.map(item => {
            let value = item.id ? item.id : item.value;
            let label = item.identifier ? item.identifier : item.label;
            return { value, label };
          });

    return values;
  };

  handleTaskOrderChange = selection => {
    let data = {};
    data[FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS] = selection.map(item => ({
      id: item.value,
      identifier: item.label,
    }));

    const updatedFormData = Object.assign(this.state.updatedFormData, data);
    debugger;
    this.setState({ updatedFormData });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      isLoading: false,
    });

    api
      .workOrder()
      .postTaskOrder(this.props.workOrderId, this.state.updatedFormData)
      .then(res =>
        this.setState({
          submittedData: res.data,
          isLoading: false,
        })
      );
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            <label
              htmlFor={FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}
              class="form-check-label"
            >
              Task orders
            </label>
            <AsyncSelect
              name={FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}
              id={FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}
              value={this.getTaskOrderValues()}
              cacheOptions
              loadOptions={this.loadTaskOrderOptions}
              isClearable
              isMulti
              placeholder="Type to Search"
              onInputChange={this.handleInputChange}
              onChange={this.handleTaskOrderChange}
            />
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
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={`${FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}-yes`}
                id={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
                value="Yes"
                onChange={this.handleChange}
                checked={
                  "Yes" ===
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN
                  ]
                }
              />
              <label
                class="form-check-label"
                htmlFor={`${FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}-yes`}
              >
                Yes
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={`${FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}-no`}
                id={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
                value="No"
                checked={
                  "No" ===
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN
                  ]
                }
                onChange={this.handleChange}
              />
              <label
                class="form-check-label"
                htmlFor={`${FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}-no`}
              >
                No
              </label>
            </div>
          </div>
          <SubmitButton text="Submit" isSubmitting={this.state.isSubmitting} />
        </form>
      </div>
    );
  }
}
