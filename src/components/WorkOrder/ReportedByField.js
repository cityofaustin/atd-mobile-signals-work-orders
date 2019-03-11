import React from "react";

import Select from "react-select";

import { FIELDS, REPORTED_BY_OPTIONS } from "./formConfig";

const ReportedByField = ({ data, handleReactSelectChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={FIELDS.REPORTED_BY}>Requested By</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{
          value: data[FIELDS.REPORTED_BY],
          label: data[FIELDS.REPORTED_BY]
        }}
        isClearable
        isSearchable
        name={FIELDS.REPORTED_BY}
        options={REPORTED_BY_OPTIONS.map(item => ({
          value: item,
          label: item
        }))}
        onChange={e => handleReactSelectChange(FIELDS.REPORTED_BY, e)}
      />
    </div>
  );
};

export default ReportedByField;
