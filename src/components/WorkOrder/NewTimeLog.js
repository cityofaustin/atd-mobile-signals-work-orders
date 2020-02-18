import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import { ErrorMessage } from "./Alerts";
import NewTimeLogDateTimeFields from "./NewTimeLogDateTimeFields";
import EditTimeLogDateTimeFields from "./EditTimeLogDateTimeFields";
import SubmitButton from "../Form/SubmitButton";
import api from "../../queries/api";
import { FIELDS } from "./formConfig";

import "react-datepicker/dist/react-datepicker.css";

class NewTimeLog extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.workOrderId = this.props.workOrderId;

    this.state = {
      technicianOptions: [],
      vehicleOptions: [],
      timeLogData: [],
      timeLogToEdit: null,
      updatedFormData: { field_1424: this.workOrderId },
      isFormDisabled: false,
      isLoading: false,
    };
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ errors: [], isSubmitting: true });

    console.log("submitting: ", this.state.updatedFormData, this.workOrderId);

    const postRecord = () =>
      api.workOrder().newTimeLog(this.workOrderId, this.state.updatedFormData);
    const putRecord = () =>
      api
        .workOrder()
        .editTimeLog(
          this.props.timeLogSelectedForEdit,
          this.state.updatedFormData
        );

    const timeLogSubmitRequest = this.props.isEditingTimeLog
      ? putRecord
      : postRecord;

    timeLogSubmitRequest()
      .then(res => {
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          successfulResponseData: res.data.record,
        });
        this.props.restoreTimeLogTable();
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false,
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

  handleFormDisable = boolean => {
    this.setState({ isFormDisabled: boolean });
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
        this._isMounted && this.setState({ technicianOptions });
      });
  };

  getVehicleOptions = () => {
    api
      .workOrder()
      .getVehicleOptions()
      .then(res => {
        const vehicleOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this._isMounted && this.setState({ vehicleOptions });
      });
  };

  handleDateTimeFieldChange = (fieldId, fieldData) => {
    let formData = this.state.updatedFormData;

    formData[fieldId] = fieldData;
    this.setState({ updatedFormData: formData });
  };

  setTimeLogToEdit = () => {
    const timeLogToEdit = this.state.timeLogData.filter(
      record => record.id === this.props.timeLogSelectedForEdit
    )[0];
    this.setState({ timeLogToEdit });
  };

  handleFormCancelClick = () => {
    this.props.handleTimeLogFormCancel();
  };

  requestTimeLogs = id => {
    this.setState({ isLoading: true });
    api
      .workOrder()
      .getTimeLogs(id)
      .then(res => {
        this._isMounted &&
          this.setState({ timeLogData: res.data.records }, () => {
            this.setState({ isLoading: false });
            this.setTimeLogToEdit();
          });
      });
  };

  getEditFieldDefaultValues = defaultValuesArray => {
    // DatePicker needs different keys than Knack provides to populate fields
    defaultValuesArray.forEach(record => {
      record["label"] = record.identifier;
      record["value"] = record.id;
    });
    return defaultValuesArray;
  };

  componentDidMount() {
    this._isMounted = true;
    this.getTechnicianOptions();
    this.getVehicleOptions();
    this.requestTimeLogs(this.workOrderId);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { timeLogToEdit } = this.state;
    const { isEditingTimeLog } = this.props;

    return this.state.isLoading ? (
      <FontAwesomeIcon
        icon={faSpinner}
        className="atd-spinner--padded"
        size="2x"
      />
    ) : (
      <div>
        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor={FIELDS.TIMELOG.TECHNICIANS}>Technician(s)</label>
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              defaultValue={
                (timeLogToEdit &&
                  this.getEditFieldDefaultValues(
                    timeLogToEdit[FIELDS.TIMELOG.EDIT_TECHNICIANS]
                  )) ||
                []
              }
              id={FIELDS.TIMELOG.TECHNICIANS}
              name={FIELDS.TIMELOG.TECHNICIANS}
              aria-describedby={`${FIELDS.TIMELOG.TECHNICIANS}-text`}
              placeholder={"Leave blank for yourself"}
              options={this.state.technicianOptions}
              onChange={this.handleReactMultiSelectChange.bind(
                this,
                FIELDS.TIMELOG.TECHNICIANS
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor={FIELDS.TIMELOG.VEHICLES}>Vehicles(s)</label>
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              defaultValue={
                (timeLogToEdit &&
                  this.getEditFieldDefaultValues(
                    timeLogToEdit[FIELDS.TIMELOG.EDIT_VEHICLES]
                  )) ||
                []
              }
              id={FIELDS.TIMELOG.VEHICLES}
              name={FIELDS.TIMELOG.VEHICLES}
              options={this.state.vehicleOptions}
              onChange={this.handleReactMultiSelectChange.bind(
                this,
                FIELDS.TIMELOG.VEHICLES
              )}
            />
          </div>
          {!isEditingTimeLog && (
            <NewTimeLogDateTimeFields
              data={this.state.updatedFormData}
              handleTimeChange={this.handleDateTimeFieldChange}
              handleFormDisable={this.handleFormDisable}
              isFormDisabled={this.state.isFormDisabled}
            />
          )}
          {isEditingTimeLog &&
            timeLogToEdit && (
              <EditTimeLogDateTimeFields
                data={this.state.updatedFormData}
                handleTimeChange={this.handleDateTimeFieldChange}
                handleFormDisable={this.handleFormDisable}
                isFormDisabled={this.state.isFormDisabled}
                timeLogToEdit={timeLogToEdit}
              />
            )}
          <div className="row">
            <div className="col-6">
              <SubmitButton
                text={`${isEditingTimeLog ? "Edit" : "Add"} Time Log`}
                buttonStyles={`btn-block`}
                isSubmitting={this.state.isSubmitting}
                isFormDisabled={this.state.isFormDisabled}
              />
            </div>
            <div className="col-6">
              <div
                className={`btn btn-danger btn-lg btn-block`}
                onClick={this.handleFormCancelClick}
              >
                Cancel
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTimeLog;
