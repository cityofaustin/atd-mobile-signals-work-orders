import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import api from "../../queries/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FIELDS } from "./formConfig";

class CsrField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        field_1232: "", // NEW_CSR_NUMBER
        field_1235: props.formData[FIELDS.CSR] || "" // SELECTED_CSR_NUMBER
      },
      selectedOption: "",
      csrUiDisplayNew: false,
      hasError: false,
      errorText: ""
    };
  }

  handleChange = e => {
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  toggleCsrDropdown = () => {
    this.setState({ csrUiDisplayNew: !this.state.csrUiDisplayNew });
  };

  createNewCsrNumber = () => {
    const isValid = this.validateCsrNumber();
    if (!isValid) return false;

    api
      .csrNumber()
      .new(this.state.formData)
      .then(res => {
        let newSelectedCsrOption = {
          label: res.data.record[FIELDS.CSR_LABEL],
          value: res.data.record.id
        };
        this.setState({
          hasError: false,
          csrUiDisplayNew: false,
          formData: {
            field_1232: res.data.record.id
          },
          csrOptions: [newSelectedCsrOption],
          selectedOption: newSelectedCsrOption
        });
        this.props.handleCsrChange(newSelectedCsrOption);
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
    const csrNumber = this.state.formData[FIELDS.NEW_CSR];
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
    //
    if (prefixValidates && suffixValidates) {
      return true;
    } else {
      this.setState({ hasError: true, errorText });
      return false;
    }
  };

  handleCsrChange = selection => {
    // We need to check for a null value because a user can "x" out a previous
    // selection. In that case, the value of selection is null. We need to
    // coerce that null value to a object with a "value" attribute set equal to
    // an empty string "".
    this.setState({
      selectedOption: selection
    });

    if (selection === null) {
      let blankSelection = {};
      blankSelection.value = "";
      this.props.handleCsrChange(blankSelection);
    } else {
      this.props.handleCsrChange(selection);
    }
  };

  loadOptions = (inputValue, callback) => {
    if (inputValue.length < 2) {
      return inputValue;
    }
    api
      .workOrder()
      .csr(inputValue)
      .then(res => {
        const csrOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ csrOptions });
        if (this.state.selectedOption) {
          debugger;
          csrOptions.push(this.state.selectedOption);
        }
        return callback(csrOptions);
      });
  };

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor={FIELDS.CSR}>CSR #</label>

        {this.state.csrUiDisplayNew ? (
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
              name={FIELDS.NEW_CSR}
              onKeyUp={this.handleChange}
            />
            <div
              className="btn btn-secondary mt-2"
              onClick={this.createNewCsrNumber}
            >
              Create New CSR Number
            </div>
            <div
              className="btn btn-danger mt-2 ml-2"
              onClick={this.toggleCsrDropdown}
            >
              Cancel
            </div>
          </div>
        ) : (
          <div>
            <AsyncSelect
              name={FIELDS.CSR}
              value={this.state.selectedOption}
              cacheOptions
              loadOptions={this.loadOptions}
              isClearable
              placeholder="Type to Search"
              onInputChange={this.handleInputChange}
              onChange={this.handleCsrChange}
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
