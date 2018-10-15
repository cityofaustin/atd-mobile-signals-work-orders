import React from "react";
import { Link } from "@reach/router";

export const ErrorMessage = ({ error }) => (
  <div className="alert alert-danger" role="alert">
    <span>{error.message}</span>
  </div>
);

export const SuccessMessage = ({ newWorkOrder }) => (
  <div className="alert alert-success" role="alert">
    <span>
      <Link to={`/work-orders/${newWorkOrder.id}`} className="alert-link">
        New Work Order
      </Link>{" "}
      successfully created!
    </span>
  </div>
);
