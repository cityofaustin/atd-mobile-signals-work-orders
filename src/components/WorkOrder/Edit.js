import React, { Component } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Header from "../Shared/Header";

import { editWorkOrderInitialState } from "./formDataInitialState";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: editWorkOrderInitialState
    };
  }
  render() {
    return (
      <div>
        <Header icon={faEdit} title="Edit Work Order" />
      </div>
    );
  }
}

export default Edit;
