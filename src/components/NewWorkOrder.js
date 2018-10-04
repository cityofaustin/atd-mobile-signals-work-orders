import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";

class NewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        field_900: null,
        field_976: "LED Out",
        field_977: "Signal",
        field_1004: "Trouble Call",
        field_1420: "",
        field_1871: [""]
      }
    };
  }
  submitForm = e => {
    debugger;
    e.preventDefault();
    api
      .workOrder()
      .new(this.state.formData)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} /> New Work Order
        </h1>
        <form onSubmit={this.submitForm}>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewWorkOrder;
