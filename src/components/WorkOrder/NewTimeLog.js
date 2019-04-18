import React, { Component } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Select from "react-select";

import Header from "../Shared/Header";
import { ErrorMessage } from "./Alerts";
import SubmitButton from "../Form/SubmitButton";

import api from "../../queries/api";
import { FIELDS } from "./formConfig";
import { workOrderFields } from "../../queries/fields";

class NewTimeLog extends Component {
  constructor(props) {
    super(props);

    this.workOrderId = this.props.match.params.workOrderId;

    this.state = {
      technicianOptions: [],
      updatedFormData: { field_1424: this.workOrderId }
    };
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });

    console.log("submitting: ", this.state.updatedFormData);

    console.log(this.workOrderId);
    api
      .workOrder()
      .newTimeLog(this.workOrderId, this.state.updatedFormData)
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

  handleReactSelectChange = (fieldId, selected) => {
    let updatedData = selected ? selected.value : "";

    // create object of updated data
    let updatedFormData = Object.assign({}, this.state.updatedFormData, {
      [fieldId]: updatedData
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

  handleReactMultiSelectChange = (name, values) => {
    // React-Select sends the event as the updated selected values.
    // https://github.com/JedWatson/react-select/issues/1631
    let data = {};
    data[name] = values.map(item => item.value);

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

  getTechnicianOptions = () => {
    api
      .workOrder()
      .getTimeLogTechnicianOptions()
      .then(res => {
        const technicianOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ technicianOptions });
      });
  };

  componentDidMount() {
    this.getTechnicianOptions();
  }

  render() {
    return (
      <div>
        <Header icon={faClock} title="New Time Log" />

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor={workOrderFields.timelog.TECHNICIAN}>
              Technician(s)
            </label>
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              defaultValue={[]}
              name={workOrderFields.timelog.TECHNICIAN}
              options={this.state.technicianOptions}
              onChange={this.handleReactMultiSelectChange.bind(
                this,
                workOrderFields.timelog.TECHNICIAN
              )}
            />
          </div>
          <SubmitButton
            text="Add Log Entry"
            isSubmitting={this.state.isSubmitting}
          />
        </form>
      </div>
    );
  }
}

export default NewTimeLog;
