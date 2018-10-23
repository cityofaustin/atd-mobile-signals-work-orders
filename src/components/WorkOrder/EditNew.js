import React, { Component } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import api from "../../queries/api";
import FormGroup from "../Form/FormGroup";

import {
  FIELDS,
  ASSIGN_TO_SELF_OPTIONS,
  WORK_TYPE_TROUBLE_CALL_OPTIONS
} from "./formConfig";

class EditNewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderDetails: {},
      formData: {
        field_1754: "", // LEAD_TECHNICIAN
        field_1752: "No" // ASSIGN_TO_SELF
      },
      technicianOptions: []
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }

  componentDidMount() {
    this.getDetails(this.workOrderId);
    this.getTechnicianOptions();
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  getDetails = workOrderId => {
    api
      .workOrder()
      .getEditNewWorkOrderDetails(workOrderId)
      .then(res => this.setState({ workOrderDetails: res.data }));
  };

  getTechnicianOptions = searchValue => {
    api
      .workOrder()
      .technicians()
      .then(res => {
        const technicianOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ technicianOptions });
      });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });
    api
      .workOrder()
      .new(this.state.formData)
      .then(res => {
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          newWorkOrder: res.data.record
        });
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false
        });
      });
  };

  handleReactSelectChange = (fieldId, selected) => {
    debugger;
    let formData = this.state.formData;
    formData[fieldId] = selected ? selected.value : "";
    this.setState({ formData });
  };

  render() {
    const { workOrderDetails } = this.state;
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {workOrderDetails[FIELDS.LOCATION_NAME_RAW]}
        </h1>
        <div className="row">
          <div className="col-6">
            <h4>{workOrderDetails[FIELDS.ASSET_TYPE]}</h4>
          </div>
          <div className="col-6">
            <h4>{workOrderDetails[FIELDS.WORK_TYPE_TROUBLE_CALL]}</h4>
            <h4>{workOrderDetails[FIELDS.WORK_TYPE_SCHEDULED_WORK]}</h4>
          </div>
        </div>
        <div>
          <form onSubmit={this.submitForm}>
            <FormGroup
              label="Assign to Self"
              defaultValue={this.state.formData[FIELDS.ASSIGN_TO_SELF]}
              fieldId={FIELDS.ASSIGN_TO_SELF}
              onChangeHandler={this.handleChange}
              options={ASSIGN_TO_SELF_OPTIONS}
              inputType="basicSelect"
              helpText="Check yes if the work order should be assigned to yourself."
            />

            <div className="form-group">
              <label htmlFor={FIELDS.LEAD_TECHNICIAN}>Lead Technician</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={""}
                isClearable
                isSearchable
                name={FIELDS.LEAD_TECHNICIAN}
                options={this.state.technicianOptions}
                onChange={this.handleReactSelectChange.bind(
                  this,
                  FIELDS.LEAD_TECHNICIAN
                )}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditNewWorkOrder;
