import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

import ListWithSearchAndPage from "./Shared/ListWithSearchAndPages";

import { workOrderFields } from "../queries/fields";
import { getAllWorkOrders, searchAllWorkOrders } from "./WorkOrder/helpers";

const fields = workOrderFields.baseFields;

class AllWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWorkOrdersData: [],
      loading: true,
      lastPage: 1,
    };
  }

  componentDidMount() {
    getAllWorkOrders().then(data => {
      this.setState({
        allWorkOrdersData: data.records,
        lastPage: data.total_pages,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faTruck} /> All Work Orders
        </h1>

        <ListWithSearchAndPage
          data={this.state.allWorkOrdersData}
          lastPage={this.state.lastPage}
          searchQuery={searchAllWorkOrders}
          titleField={fields.locationAll}
        />
      </div>
    );
  }
}

export default AllWorkOrders;
