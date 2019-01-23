import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import api from "../../queries/api";
import FormGroup from "../Form/FormGroup";
import CsrField from "./CsrField";
import DateTimeRangePicker from "./DateTimeRangePicker";
import { ErrorMessage, SuccessMessage } from "./Alerts";

import { FIELDS, YES_NO_OPTIONS, REPORTED_BY_OPTIONS } from "./formConfig";

class EditNewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      workOrderDetails: {},
      formData: {
        field_1752: "No", // ASSIGN_TO_SELF
        field_1754: "", // LEAD_TECHNICIAN
        field_909: [], // SUPPORT_TECHNICIANS
        field_463: "", // WORK DESCRIPTION
        field_968: "", // REPORTED_BY
        field_1235: "", // CSR_NUMBER
        field_1006: "No", // SCHEDULE_IMMEDIATELY
        field_460: "" // WORK_SCHEDULED_DATE
      },
      errors: [],
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
      .editNewWorkOrder(this.workOrderId, this.state.formData)
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
    let formData = this.state.formData;
    formData[fieldId] = selected ? selected.value : "";
    this.setState({ formData });
  };

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    let formData = this.state.formData;
    formData[name] = values.map(item => item.value);
    this.setState({ formData });
  };

  handleCsrChange = selection => {
    let formData = this.state.formData;
    formData[FIELDS.CSR] = selection.value;
    this.setState({ formData });
  };

  handleScheduledTimeChange = value => {
    let formData = this.state.formData;
    formData[FIELDS.WORK_SCHEDULED_DATE] = value;
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

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <div>
          <form onSubmit={this.submitForm}>
            <FormGroup
              label="Assign to Self"
              defaultValue={this.state.formData[FIELDS.ASSIGN_TO_SELF]}
              fieldId={FIELDS.ASSIGN_TO_SELF}
              onChangeHandler={this.handleChange}
              options={YES_NO_OPTIONS}
              inputType="basicSelect"
              helpText="Check yes if the work order should be assigned to yourself."
            />

            {this.state.formData[FIELDS.ASSIGN_TO_SELF] === "No" && (
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
                  onChange={e =>
                    this.handleReactSelectChange(FIELDS.LEAD_TECHNICIAN, e)
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
                options={this.state.technicianOptions}
                onChange={this.handleReactMultiSelectChange.bind(
                  this,
                  FIELDS.SUPPORT_TECHNICIANS
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor={FIELDS.WORK_DESCRIPTION}>Work Description</label>
              <textarea
                className="form-control"
                name={FIELDS.WORK_DESCRIPTION}
                id={FIELDS.WORK_DESCRIPTION}
                onChange={this.handleChange}
              />
            </div>

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
                  this.handleReactSelectChange(FIELDS.REPORTED_BY, e)
                }
              />
            </div>

            <CsrField
              handleCsrChange={this.handleCsrChange}
              formData={this.state.formData}
            />

            <FormGroup
              label="Schedule Immediately"
              defaultValue={this.state.formData[FIELDS.SCHEDULE_IMMEDIATELY]}
              fieldId={FIELDS.SCHEDULE_IMMEDIATELY}
              onChangeHandler={this.handleChange}
              options={YES_NO_OPTIONS}
              inputType="basicSelect"
            />

            {this.state.formData[FIELDS.SCHEDULE_IMMEDIATELY] === "No" && (
              <DateTimeRangePicker
                fieldName={FIELDS.WORK_SCHEDULED_DATE}
                handleScheduledTimeChange={this.handleScheduledTimeChange}
              />
            )}

            <button type="submit" className="btn btn-primary">
              {this.state.isSubmitting ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="2x"
                  className="atd-spinner"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditNewWorkOrder;
