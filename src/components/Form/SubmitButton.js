import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SubmitButton({
  style,
  buttonStyles,
  isFormDisabled,
  isSubmitting,
  text,
  spinnerSize = "2x",
}) {
  return (
    <button
      type="submit"
      className={
        style ||
        `btn btn-primary btn-lg ${buttonStyles} ${
          isFormDisabled ? "disabled" : ""
        }`
      }
      disabled={isFormDisabled}
    >
      {isSubmitting ? (
        <FontAwesomeIcon
          icon={faSpinner}
          size={spinnerSize}
          className="atd-spinner"
        />
      ) : (
        text || "Submit"
      )}
    </button>
  );
}
