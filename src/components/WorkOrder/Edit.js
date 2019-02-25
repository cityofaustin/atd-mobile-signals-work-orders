import React, { Component } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Header from "../Shared/Header";
import WorkTypeFields from "./WorkTypeFields";
import ReportedByField from "./ReportedByField";
import CsrField from "./CsrField";
import AssetTypeField from "./AssetTypeField";

import { FIELDS } from "./formConfig";
import { getWorkOrderDetailsAndTitle } from "./helpers";
import { editWorkOrderInitialState } from "./formDataInitialState";
import AssignTechnicianFields from "./AssignTechnicianFields";
import SubmitButton from "../Form/SubmitButton";
import api from "../../queries/api";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderDetails: {},
      formData: editWorkOrderInitialState,
      isLoading: true
      errors: [],
      isLoading: true,
      isSubmitting: false,
      isSubmitted: false,
      updatedWorkOrder: null
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }

  componentDidMount = () => {
    getWorkOrderDetailsAndTitle(this.workOrderId).then(data => {
      this.setState({ workOrderDetails: data, isLoading: false });
    });
  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });

    api
      .workOrder()
      .edit(this.workOrderId, this.state.formData)
      .then(res => {
        console.log(res);
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          updatedWorkOrder: res.data.record
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
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  handleCsrChange = selection => {
    let formData = this.state.formData;
    formData[FIELDS.CSR] = selection.value;
    this.setState({ formData });
  };

  handleReactSelectChange = (fieldId, selected) => {
    let formData = this.state.formData;
    formData[fieldId] = selected ? selected.value : "";
    this.setState({ formData });
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

  render() {
    console.log(this.state.formData);
    return (
      <div>
        <Header icon={faEdit} title="Edit Work Order" />

        <form onSubmit={this.submitForm}>
          {!this.state.isLoading && (
            <>
              <AssetTypeField
                formData={this.state.formData}
                handleChange={this.handleChange}
              />

              <WorkTypeFields values={this.state.formData} />

              {/* REQUESTED_BY */}
              <AssignTechnicianFields
                formData={this.state.formData}
                handleAssignToSelfFieldChange={this.handleChange}
                handleLeadTechnicianFieldChange={this.handleReactSelectChange}
                handleSupportTechniciansFieldChange={
                  this.handleReactMultiSelectChange
                }
              />

              <ReportedByField
                formData={this.state.formData}
                handleReactSelectChange={this.handleReactSelectChange}
              />

              {/* CSR */}
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
