import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import api from "../../queries/api";
import { newWorkOrderInitialState } from "./formDataInitialState";
import { FIELDS } from "./formConfig";

import Header from "../Shared/Header";
import { ErrorMessage, SuccessMessage } from "./Alerts";
import WorkTypeFields from "./WorkTypeFields";
import AssetTypeField from "./AssetTypeField";
import AssignTechnicianFields from "./AssignTechnicianFields";
import CsrField from "./CsrField";
import ReportedByField from "./ReportedByField";
import ScheduleFields from "./ScheduleFields";
import TaskOrderField from "./TaskOrderField";
import SubmitButton from "../Form/SubmitButton";

class NewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: newWorkOrderInitialState,
      updatedFormData: newWorkOrderInitialState,
      errors: [],
      isSubmitting: false,
      isSubmitted: false,
      newWorkOrder: null,
      workTypeScheduledWorkOptions: [],
    };
  }

  handleChange = e => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[e.target.name] = e.target.value;

    const rawData = Object.assign({}, this.state.rawData, updatedFormData);

    this.setState({ updatedFormData, rawData });
  };

  handleFormDataChange = (updatedData, field) => {
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

    // remove raw field if its passed as a param
    if (field) {
      delete updatedAllData[`${field}_raw`];
    }

    // TODO: Only send field id update for if asssociated ASSET_TYPE is active
    // let fieldsList = Object.keys(FIELDS.ASSETS).map(
    //   item => FIELDS.ASSETS[item].fieldId
    // );
    // fieldsList.forEach(fieldId => delete data[fieldId]);

    // TODO: Don't send raw fields in form submit
    // updatedAllData[`${e.target.name}_raw`] = "";

    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    let data = {};
    data[name] = values.map(item => item.value);
    // TODO: figure out why multi select isn't updated properly via Knack API

    // create object of updated data
    let updatedFormData = Object.assign({}, this.state.updatedFormData, data);

    // merge updated data into all data
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );

    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  handleCsrChange = selection => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[FIELDS.CSR] = selection.value;
    this.setState({ updatedFormData });
  };

  handleScheduledTimeChange = object => {
    let updatedFormData = this.state.updatedFormData;
    updatedFormData[FIELDS.WORK_SCHEDULED_DATE] = object;
    delete updatedFormData[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

    // merge updated data into all data
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );
    delete updatedAllData[`${FIELDS.WORK_SCHEDULED_DATE}_raw`];

    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  handleAsyncInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  handleTaskOrderChange = selection => {
    this.setState({
      [FIELDS.TASK_ORDERS]: selection,
    });
  };

  handleReactSelectChange = (fieldId, selected) => {
    let updatedData = selected ? selected.value : "";

    // create object of updated data
    let updatedFormData = Object.assign({}, this.state.updatedFormData, {
      [fieldId]: updatedData,
    });

    // merge updated data into all data
    const updatedAllData = Object.assign(
      {},
      this.state.rawData,
      updatedFormData
    );

    delete updatedAllData[`${fieldId}_raw`];

    this.setState({ updatedFormData, rawData: updatedAllData });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });
    api
      .workOrder()
      .new(this.state.updatedFormData)
      .then(res => {
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          newWorkOrder: res.data.record,
        });
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false,
        });
      });
  };

  render() {
    if (!!this.state.newWorkOrder) {
      return <Redirect to={`/work-orders/${this.state.newWorkOrder.id}`} />;
    }

    return (
      <div>
        <Header icon={faWrench} title="New Work Order" />

        {this.state.isSubmitted && (
          <SuccessMessage formVerb="create" formType="New Work Order" />
        )}

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm}>
          <AssetTypeField
            data={this.state.rawData}
            handleAssetChange={this.handleFormDataChange}
          />

          <WorkTypeFields
            data={this.state.rawData}
            handleWorkTypeChange={this.handleFormDataChange}
          />

          <AssignTechnicianFields
            data={this.state.rawData}
            handleAssignToSelfFieldChange={this.handleChange}
            handleLeadTechnicianFieldChange={this.handleReactSelectChange}
            handleSupportTechniciansFieldChange={
              this.handleReactMultiSelectChange
            }
          />

          <div className="form-group">
            <label htmlFor={FIELDS.WORK_DESCRIPTION}>Work Description</label>
            <textarea
              className="form-control"
              name={FIELDS.WORK_DESCRIPTION}
              id={FIELDS.WORK_DESCRIPTION}
              onChange={this.handleChange}
            />
          </div>

          <ReportedByField
            data={this.state.rawData}
            handleReactSelectChange={this.handleReactSelectChange}
          />

          {this.state.rawData[FIELDS.REPORTED_BY] ===
            "311 Customer Service Request (CSR)" && (
            <CsrField
              data={this.state.rawData}
              handleCsrChange={this.handleCsrChange}
            />
          )}

          <ScheduleFields
            data={this.state.rawData}
            handleScheduledTimeChange={this.handleScheduledTimeChange}
            toggleScheduleChange={this.handleChange}
          />

          <TaskOrderField
            data={this.state.rawData}
            handleFormDataChange={this.handleFormDataChange}
          />

          <SubmitButton text="Submit" isSubmitting={this.state.isSubmitting} />
        </form>
      </div>
    );
  }
}

export default NewWorkOrder;
