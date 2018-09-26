import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

class NewWorkOrder extends Component {
  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} /> New Work Order
        </h1>
        <code>TODO</code>
      </div>
    );
  }
}

export default NewWorkOrder;
