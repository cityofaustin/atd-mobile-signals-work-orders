import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import { FIELDS } from "./formConfig";
import SubmitButton from "../Form/SubmitButton";
import { ErrorMessage, SuccessMessage } from "./Alerts";

import api from "../../queries/api";

export default class WorkSpecifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedFormData: {
        _id: this.props.workOrderId,
      },
      options: [],
      errors: [],
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

  toggleBoolean = e => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[e.target.id] =
      this.state.updatedFormData[e.target.id] === "Yes" ? "No" : "Yes";

    this.setState({ updatedFormData });
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
    this.setState({ updatedFormData });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      errors: [],
      isSubmitting: true,
    });

    api
      .workOrder()
      .postTaskOrder(this.props.workOrderId, this.state.updatedFormData)
      .then(res =>
        this.setState({
          submittedData: res.data,
          isSubmitting: false,
          isSubmitted: true,
        })
      )
      .catch(error => {
        console.log(error.response.data.errors);
        window.scrollTo(0, 0); // Scroll to top to see error msgs
        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false,
        });
      });
  };

  componentDidMount() {
    api
      .workOrder()
      .getTaskOrder(this.props.workOrderId)
      .then(res => {
        const updatedFormData = {
          [FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND]:
            res.data[FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND],
          [FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS]:
            res.data[`${FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}_raw`],
          [FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN]:
            res.data[FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN],
          [FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL]:
            res.data[FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL],
          [FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED]:
            res.data[FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED],
          [FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION]:
            res.data[FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION],
          [FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET]:
            res.data[FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET],
        };
        this.setState({ updatedFormData });
      });
  }

  render() {
    return (
      <div>
        {this.props.data.field_459 === "Submitted" ? (
          <div className="form-group">
            <dl>
              <dt>Problem Found</dt>
              <dd>
                {
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND
                  ]
                }
              </dd>
            </dl>
            <dl>
              <dt>Task Orders</dt>
              <dd>
                {this.state.updatedFormData[
                  FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS
                ]
                  .map(item => {
                    return item.identifier;
                  })
                  .join(" ")}
              </dd>
            </dl>
            <dl>
              <dt>Action Taken</dt>
              <dd>
                {
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN
                  ]
                }
              </dd>
            </dl>
            <dl>
              <dt>Checked All Peds, Colors, Buttons, Detection, Program</dt>
              <dd>
                {
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL
                  ]
                }
              </dd>
            </dl>
            <dl>
              <dt>Follow Up Needed</dt>
              <dd>
                {
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED
                  ]
                }
              </dd>
            </dl>
            <dl>
              <dt>Follow Up Description</dt>
              <dd>
                {
                  this.state.updatedFormData[
                    FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION
                  ]
                }
              </dd>
            </dl>
          </div>
        ) : (
          <div>
            {this.state.isSubmitted && (
              <SuccessMessage
                formType="Work Specifications"
                formVerb="update"
              />
            )}
            {this.state.errors &&
              this.state.errors.map(error => (
                <ErrorMessage error={error} key={error.field} />
              ))}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}>
                  Problem Found
                </label>
                <textarea
                  className="form-control"
                  id={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}
                  name={FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND}
                  rows="3"
                  onChange={this.handleChange}
                  value={
                    this.state.updatedFormData[
                      FIELDS.WORK_SPECIFICATIONS.PROBLEM_FOUND
                    ]
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label
                  htmlFor={FIELDS.WORK_SPECIFICATIONS.TASK_ORDERS}
                  className="form-check-label"
                >
                  Task Orders
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
                  Action Taken
                </label>
                <textarea
                  className="form-control"
                  id={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
                  name={FIELDS.WORK_SPECIFICATIONS.ACTION_TAKEN}
                  rows="3"
                  onChange={this.handleChange}
                  value={
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
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`${FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}-yes`}
                    id={FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}
                    value="Yes"
                    onChange={this.handleChange}
                    checked={
                      "Yes" ===
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL
                      ]
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}-yes`}
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`${FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}-no`}
                    id={FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}
                    value="No"
                    checked={
                      "No" ===
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL
                      ]
                    }
                    onChange={this.handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${FIELDS.WORK_SPECIFICATIONS.CHECKED_ALL}-no`}
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={this.toggleBoolean}
                    value={
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED
                      ]
                    }
                    checked={
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED
                      ] === "Yes"
                    }
                    id={FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED}
                  >
                    Follow Up Needed
                  </label>
                </div>
              </div>
              {this.state.updatedFormData[
                FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_NEEDED
              ] === "Yes" && (
                <div className="form-group">
                  <label
                    htmlFor={FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION}
                  >
                    Follow Up Description
                  </label>
                  <textarea
                    className="form-control"
                    id={FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION}
                    name={FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION}
                    rows="3"
                    onChange={this.handleChange}
                    value={
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.FOLLOW_UP_DESCRIPTION
                      ]
                    }
                  ></textarea>
                </div>
              )}
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={this.toggleBoolean}
                    value={
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET
                      ]
                    }
                    checked={
                      this.state.updatedFormData[
                        FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET
                      ] === "Yes"
                    }
                    id={FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={FIELDS.WORK_SPECIFICATIONS.SUBMIT_WORK_TICKET}
                  >
                    Submit Work Ticket
                  </label>
                </div>
              </div>
              <SubmitButton
                text="Submit"
                isSubmitting={this.state.isSubmitting}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}
