import React, { Component } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Header from "../Shared/Header";
import WorkTypeFields from "./WorkTypeFields";
import ReportedByField from "./ReportedByField";
import CsrField from "./CsrField";
import AssetTypeField from "./AssetTypeField";
import { ErrorMessage, SuccessMessage } from "./Alerts";

import { FIELDS } from "./formConfig";
import AssignTechnicianFields from "./AssignTechnicianFields";
import SubmitButton from "../Form/SubmitButton";
import api from "../../queries/api";
import TaskOrderField from "./TaskOrderField";
import ScheduleFields from "./ScheduleFields";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: {},
      updatedFormData: {},
      errors: [],
      isLoading: true,
      isSubmitting: false,
      isSubmitted: false,
      successfulResponseData: null
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }

  componentDidMount = () => {
    api
      .workOrder()
      .getEditPageDetails(this.workOrderId)
      .then(res => this.setState({ rawData: res.data, isLoading: false }));
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });

    console.log("submitting: ", this.state.updatedFormData);

    api
      .workOrder()
      .edit(this.workOrderId, this.state.updatedFormData)
      .then(res => {
        console.log(res);
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          successfulResponseData: res.data.record
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

  handleChange = e => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[e.target.name] = e.target.value;
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );
    updatedAllData[`${e.target.name}_raw`] = "";
    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  handleFormDataChange = updatedData => {
    // create object of updated data
    let updatedFormData = Object.assign(
      {},
      this.state.updatedFormData,
      updatedData
    );

    // merge updated data into all data
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );

    // TODO: Only send field id update for if asssociated ASSET_TYPE is active
    // let fieldsList = Object.keys(FIELDS.ASSETS).map(
    //   item => FIELDS.ASSETS[item].fieldId
    // );
    // fieldsList.forEach(fieldId => delete data[fieldId]);

    // TODO: Don't send raw fields in form submit
    // updatedAllData[`${e.target.name}_raw`] = "";

    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  handleCsrChange = selection => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[FIELDS.CSR] = selection.value;
    this.setState({ updatedFormData });
  };

  handleReactSelectChange = (fieldId, selected) => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[fieldId] = selected ? selected.value : "";
    this.setState({ updatedFormData });
  };

  handleReactSelectChange = (fieldId, selected) => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[fieldId] = selected ? selected.value : "";
    this.setState({ updatedFormData });
  };

  handleAsyncInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  handleTaskOrderChange = selection => {
    this.setState({
      [FIELDS.TASK_ORDERS]: selection
    });
  };

  handleScheduledTimeChange = value => {
    let formData = this.state.formData;
    formData[FIELDS.WORK_SCHEDULED_DATE] = value;
    this.setState({ formData });
  };

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    let formData = this.state.formData;
    formData[name] = values.map(item => item.value);
    this.setState({ formData });
  };

  render() {
    return (
      <div>
        <Header icon={faEdit} title="Edit Work Order" />

        {this.state.isSubmitted && (
          <SuccessMessage formType="Work Order" formVerb="update" />
        )}

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm}>
          {!this.state.isLoading && (
            <>
              <AssetTypeField
                data={this.state.rawData}
                handleAssetChange={this.handleFormDataChange}
              />

              <WorkTypeFields
                data={this.state.rawData}
                handleWorkTypeChange={this.handleFormDataChange}
              />

              <AssignTechnicianFields
                formData={this.state.formData}
                handleAssignToSelfFieldChange={this.handleChange}
                handleLeadTechnicianFieldChange={this.handleReactSelectChange}
                handleSupportTechniciansFieldChange={
                  this.handleReactMultiSelectChange
                }
              />

              <ScheduleFields
                handleScheduledTimeChange={this.handleScheduledTimeChange}
                toggleScheduleChange={this.handleChange}
                formData={this.state.formData}
              />

              <TaskOrderField
                handleInputChange={this.handleAsyncInputChange}
                onChange={this.handleTaskOrderChange}
                formData={this.state.formData}
              />

              <ReportedByField
                formData={this.state.formData}
                handleReactSelectChange={this.handleReactSelectChange}
              />

              <CsrField
                handleCsrChange={this.handleCsrChange}
                formData={this.state.formData}
              />

              <SubmitButton
                text="Update"
                isSubmitting={this.state.isSubmitting}
              />
            </>
          )}
        </form>
      </div>
    );
  }
}

export default Edit;
