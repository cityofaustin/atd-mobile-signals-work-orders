import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";

import { FIELDS } from "./formConfig";
import api from "../../queries/api";

export class TaskOrderField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

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
        if (this.state[FIELDS.TASK_ORDERS]) {
          options.push(this.state[FIELDS.TASK_ORDERS]);
        }
        return callback(options);
      });
  };

  getTaskOrderValues = () => {
    if (this.props.data === undefined) return [];
    let data = this.props.data[FIELDS.TASK_ORDERS];
    let rawData = this.props.data[`${FIELDS.TASK_ORDERS}_raw`];

    let values = rawData ? rawData : data;
    values = values.map(item => {
      let value = item.id ? item.id : item.value;
      let label = item.identifier ? item.identifier : item.label;
      return { value, label };
    });

    return values;
  };

  handleTaskOrderChange = selection => {
    let data = {};
    data[FIELDS.TASK_ORDERS] = selection.map(item => ({
      id: item.value,
      identifier: item.label
    }));

    this.props.handleFormDataChange(data, FIELDS.TASK_ORDERS);
  };

  handleAsyncInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");

    let data = {};
    data[FIELDS.TASK_ORDERS] = inputValue;

    this.props.handleFormDataChange(data, FIELDS.TASK_ORDERS);
    return inputValue;
  };

  render() {
    return (
      <div className="mb-3">
        <label htmlFor={FIELDS.TASK_ORDERS}>Task Order(s)</label>
        <AsyncSelect
          name={FIELDS.TASK_ORDERS}
          id={FIELDS.TASK_ORDERS}
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
    );
  }
}

export default TaskOrderField;
