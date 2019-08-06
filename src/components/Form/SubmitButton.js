import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default class SubmitButton extends Component {
  render() {
    return (
      <button
        type="submit"
        className={`btn btn-primary btn-lg ${
          this.props.isFormDisabled ? "disabled" : ""
        }`}
        disabled={this.props.isFormDisabled}
      >
        {this.props.isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
        ) : (
          this.props.text || "Submit"
        )}
      </button>
    );
  }
}
