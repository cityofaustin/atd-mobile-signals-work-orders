import React, { Component } from "react";
import FormGroup from "../Form/FormGroup";
import Select from "react-select";
import { FIELDS, YES_NO_OPTIONS } from "./formConfig";

export default class AssignTechnicianFields extends Component {
  render() {
    return (
      <>
        <FormGroup
          label="Assign to Self"
          defaultValue={this.props.formData[FIELDS.ASSIGN_TO_SELF]}
          fieldId={FIELDS.ASSIGN_TO_SELF}
          onChangeHandler={this.props.handleAssignToSelfFieldChange}
          options={YES_NO_OPTIONS}
          inputType="basicSelect"
          helpText="Check yes if the work order should be assigned to yourself."
        />

        {this.props.formData[FIELDS.ASSIGN_TO_SELF] === "No" && (
          <div className="form-group">
            <label htmlFor={FIELDS.LEAD_TECHNICIAN}>Lead Technician</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={""}
              isClearable
              isSearchable
              name={FIELDS.LEAD_TECHNICIAN}
              options={this.props.technicianOptions}
              onChange={e =>
                this.props.handleLeadTechnicianFieldChange(
                  FIELDS.LEAD_TECHNICIAN,
                  e
                )
              }
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor={FIELDS.SUPPORT_TECHNICIANS}>
            Support Technician(s)
          </label>
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            defaultValue={[]}
            name={FIELDS.SUPPORT_TECHNICIANS}
            options={this.props.technicianOptions}
            onChange={this.props.handleSupportTechniciansFieldChange.bind(
              this,
              FIELDS.SUPPORT_TECHNICIANS
            )}
          />
        </div>
      </>
    );
  }
}
