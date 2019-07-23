import React, { Component } from "react";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

import Header from "../Shared/Header";
import SubmitButton from "../Form/SubmitButton";

import api from "../../queries/api";

export default class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      isSubmitting: false,
      isSubmitted: false,
      successfulResponseData: null,
      field_1354: false,
      field_1598: "",
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });

    const formData = {
      field_1354: this.state.field_1354,
      field_1598: this.state.field_1598,
    };

    console.log("submitting: ", formData);
    api
      .workOrder()
      .submit(this.workOrderId, formData)
      .then(res => {
        console.log(res);
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          successfulResponseData: res.data.record,
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

  toggleBoolean = e => {
    this.setState({ field_1354: !this.state.field_1354 });
  };

  handleDescriptionChange = e => {
    this.setState({ field_1598: e.target.value });
  };

  render() {
    if (!!this.state.successfulResponseData) {
      return (
        <Redirect to={`/work-orders/${this.state.successfulResponseData.id}`} />
      );
    }

    return (
      <div>
        <Header icon={faFlagCheckered} title="Submit Work Order" />
        <form onSubmit={this.submitForm}>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="field_1354"
              checked={this.state.field_1354}
              onChange={e => this.toggleBoolean(e)}
            />
            <label className="form-check-label" htmlFor="field_1354">
              Follow-Up Needed
            </label>
          </div>

          {this.state.field_1354 && (
            <div className="form-group">
              <label htmlFor="field_1598">Follow-Up Description</label>
              <textarea
                className="form-control"
                id="field_1598"
                rows="3"
                onChange={this.handleDescriptionChange}
                defaultValue={this.state.field_1598}
              />
            </div>
          )}

          <SubmitButton text="Submit" isSubmitting={this.state.isSubmitting} />
        </form>
      </div>
    );
  }
}
