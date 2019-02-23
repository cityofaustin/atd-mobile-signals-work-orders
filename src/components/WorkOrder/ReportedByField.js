import React, { Component } from "react";

import Select from "react-select";

import { FIELDS, REPORTED_BY_OPTIONS } from "./formConfig";

export class ReportedByField extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={FIELDS.REPORTED_BY}>Reported By</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={""}
          isClearable
          isSearchable
          name={FIELDS.REPORTED_BY}
          options={REPORTED_BY_OPTIONS.map(item => ({
            value: item,
            label: item
          }))}
          onChange={e =>
            this.props.handleReactSelectChange(FIELDS.REPORTED_BY, e)
          }
        />
      </div>
    );
  }
}

export default ReportedByField;
