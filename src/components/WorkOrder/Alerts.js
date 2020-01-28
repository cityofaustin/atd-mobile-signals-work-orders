import React from "react";

export const ErrorMessage = ({ error }) => (
  <div className="alert alert-danger" role="alert">
    <span>{error.message}</span>
  </div>
);

export const SuccessMessage = ({ formVerb = "update", formType = "Data" }) => (
  <div className="alert alert-success" role="alert">
    <span>
      {formType} successfully {`${formVerb}`}!
    </span>
  </div>
);
