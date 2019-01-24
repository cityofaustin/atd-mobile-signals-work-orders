import React from "react";

const FormGroup = ({
  label,
  fieldId,
  onChangeHandler,
  options,
  inputType,
  defaultValue,
  helpText
}) => {
  if (inputType === "basicSelect") {
    return (
      <div className="form-group">
        <label htmlFor={fieldId}>{label}</label>
        <select
          className="form-control"
          id={fieldId}
          name={fieldId}
          onChange={onChangeHandler}
          defaultValue={defaultValue}
          aria-describedby={`${fieldId}_HelpBlock`}
        >
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <small id={`${fieldId}_HelpBlock`} className="form-text text-muted">
          {helpText}
        </small>
      </div>
    );
  }
};

export default FormGroup;
