import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";

import { FIELDS } from "./formConfig";

export class TaskOrderField extends Component {
  render() {
    return (
      <div className="mb-3">
        <label htmlFor={FIELDS.TASK_ORDERS}>Task Order(s)</label>
        <AsyncSelect
          name={FIELDS.TASK_ORDERS}
          id={FIELDS.TASK_ORDERS}
          value={this.props.formData[FIELDS.TASK_ORDERS]}
          cacheOptions
          loadOptions={this.loadTaskOrderOptions}
          isClearable
          isMulti
          placeholder="Type to Search"
          onInputChange={this.props.handleInputChange}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default TaskOrderField;
