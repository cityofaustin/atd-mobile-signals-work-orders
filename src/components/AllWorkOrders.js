import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";

class AllWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWorkOrdersData: []
    };
  }

  componentDidMount() {
    api
      .allWorkOrders()
      .getAll()
      .then(res => {
        this.setState({ allWorkOrdersData: res.data.records });
      });
  }

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faTruck} /> All Work Orders
        </h1>
        <code>{JSON.stringify(this.state.allWorkOrdersData)}</code>
      </div>
    );
  }
}

export default AllWorkOrders;
