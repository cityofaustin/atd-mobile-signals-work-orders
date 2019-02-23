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

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderDetails: {},
      formData: editWorkOrderInitialState,
      isLoading: true
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }

  componentDidMount = () => {
    getWorkOrderDetailsAndTitle(this.workOrderId).then(data => {
      this.setState({ workOrderDetails: data, isLoading: false });
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

  render() {
    console.log(this.state.formData);
    return (
      <div>
        <Header icon={faEdit} title="Edit Work Order" />

        <form onSubmit={this.handleFormSubmission}>
          {!this.state.isLoading && (
            <>
              {/* WORK_TYPE */}
              <WorkTypeFields values={this.state.workOrderDetails} />

              {/* REQUESTED_BY */}
              <ReportedByField
                formData={this.state.formData}
                handleReactSelectChange={this.handleReactSelectChange}
              />

              {/* CSR */}
              <CsrField
                handleCsrChange={this.handleCsrChange}
                formData={this.state.formData}
              />

              {/* ASSET_TYPE */}
              <AssetTypeField
                formData={this.state.formData}
                handleChange={this.handleChange}
              />
            </>
          )}
        </form>
      </div>
    );
  }
}

export default Edit;
