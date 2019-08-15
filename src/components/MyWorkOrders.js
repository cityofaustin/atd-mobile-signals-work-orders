import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";

import ListWithSearchAndPage from "./Shared/ListWithSearchAndPages";

import { workOrderFields } from "../queries/fields";
import { getMyWorkOrders, searchMyWorkOrders } from "./WorkOrder/helpers";

const fields = workOrderFields.baseFields;

class MyWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWorkOrdersData: [],
      loading: true,
      lastPage: 1,
    };
  }
  componentDidMount() {
    getMyWorkOrders().then(data => {
      this.setState({
        myWorkOrdersData: data.records,
        lastPage: data.total_pages,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faStreetView} /> My Work Orders
        </h1>

        <ListWithSearchAndPage
          data={this.state.myWorkOrdersData}
          lastPage={this.state.lastPage}
          searchQuery={searchMyWorkOrders}
          titleFieldId={fields.location}
        />
      </div>
    );
  }
}

export default MyWorkOrders;
