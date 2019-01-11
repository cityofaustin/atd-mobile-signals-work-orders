import React, { Component } from "react";
import Select from "react-select";
import _ from "lodash";
import api from "../../queries/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FIELDS } from "./formConfig";

class CsrField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        field_1232: "" // NEW_CSR_NUMBER
      },
      csrOptions: [],
      csrUiNewOption: false,
      hasError: false,
      errorText: ""
    };
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  getCsrOptions = searchValue => {
    if (searchValue.length < 2) {
      return searchValue;
    }
    api
      .workOrder()
      .csr(searchValue)
      .then(res => {
        const csrOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ csrOptions });
      });
  };

  toggleCsrDropdown = () => {
    this.setState({ csrUiNewOption: !this.state.csrUiNewOption });
  };

  createNewCsrNumber = () => {
    const isValid = this.validateCsrNumber();
    if (!isValid) return false;

    api
      .csrNumber()
      .new(this.state.formData)
      .then(res => {
        debugger;
        this.setState({
          isSubmittingCsr: false,
          isSubmittedCsr: true,
          newCsr: res.data.record
        });
        this.props.handleCsrChange({
          label: res.data.record["field_1887"],
          value: res.data.record.id
        });
      })
      .catch(error => {
        const errorsList = (
          <ul className="mb-0 ml-2">
            {error.response.data.errors.map(error => (
              <li key={error.field}>{error.message}</li>
            ))}
          </ul>
        );
        this.setState({
          hasError: true,
          errorText: errorsList
        });
      });
  };

  validateCsrNumber = () => {
    // returns a boolean
    const csrNumber = this.state.formData.field_1232;
    let csrNumbersArray = csrNumber.split("-");
    const errorText =
      "CSR number does not match forma [two-digit year] [dash] [eight-digit identifier]";

    function isNumbers(val) {
      return /^\d+$/.test(val);
    }

    if (csrNumbersArray.length !== 2) {
      this.setState({
        hasError: true,
        errorText
      });
      return false;
    }

    let prefixValidates =
      csrNumbersArray[0].length === 2 && isNumbers(csrNumbersArray[0]);
    let suffixValidates =
      csrNumbersArray[1].length === 8 && isNumbers(csrNumbersArray[1]);

    if (prefixValidates && suffixValidates) {
      return true;
    } else {
      this.setState({ hasError: true, errorText });
      return false;
    }
    console.log(csrNumber);
  };

  handleCsrChange = selection => {
    this.props.handleCsrChange(selection);
    this.getCsrOptions("");
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor={FIELDS.CSR}>CSR #</label>

        {this.state.csrUiNewOption ? (
          <div>
            {this.state.hasError ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errorText}
              </div>
            ) : (
              ""
            )}
            <input
              type="text"
              placeholder="CSR Number"
              className={`form-control ${
                this.state.hasError ? "is-invalid" : ""
              }`}
              defaultValue=""
              name="field_1232"
              onKeyUp={this.handleChange}
            />
            <div
              className="btn btn-secondary mt-2"
              onClick={this.createNewCsrNumber}
            >
              Create New CSR Number
            </div>
          </div>
        ) : (
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Type to Search"
              defaultValue={""}
              isClearable
              isSearchable
              name={FIELDS.CSR}
              options={this.state.csrOptions}
              onChange={this.handleCsrChange}
              onInputChange={this.getCsrOptions}
            />
            <div
              className="btn btn-secondary mt-2"
              onClick={this.toggleCsrDropdown}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CsrField;
