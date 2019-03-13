import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import api from "../../queries/api";
import { newWorkOrderInitialState } from "./formDataInitialState";

import Header from "../Shared/Header";
import { ErrorMessage, SuccessMessage } from "./Alerts";
import WorkTypeFields from "./WorkTypeFields";
import AssetTypeField from "./AssetTypeField";

import { FIELDS } from "./formConfig";
import SubmitButton from "../Form/SubmitButton";

class NewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: newWorkOrderInitialState,
      updatedFormData: {},
      errors: [],
      isSubmitting: false,
      isSubmitted: false,
      newWorkOrder: null,
      workTypeScheduledWorkOptions: []
    };
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
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

  handleReactMultiSelectChange = values => {
    let formData = this.state.formData;
    formData[FIELDS.WORK_TYPE_SCHEDULED_WORK] = values.map(item => item.value);
    this.setState({ formData });
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

  render() {
    if (!!this.state.newWorkOrder) {
      return (
        <Redirect to={`/work-order/edit-new/${this.state.newWorkOrder.id}`} />
      );
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

          <SubmitButton text="Submit" isSubmitting={this.state.isSubmitting} />
        </form>
      </div>
    );
  }
}

export default NewWorkOrder;
