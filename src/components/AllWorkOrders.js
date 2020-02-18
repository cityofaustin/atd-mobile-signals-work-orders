import React, { Component } from "react";

import ListWithSearchAndPage from "./Shared/ListWithSearchAndPages";
import { workOrderFields } from "../queries/fields";
import { getAllWorkOrders, searchAllWorkOrders } from "./WorkOrder/helpers";

const fields = workOrderFields.baseFields;

class AllWorkOrders extends Component {
  // Class field to keep track of component status outside of local state
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      allWorkOrdersData: [],
      loading: true,
      lastPage: 1,
    };
  }

  componentDidMount() {
    window.analytics.page("All Work Orders");

    this._isMounted = true;
    getAllWorkOrders().then(data => {
      // If component is not mounted, don't call setState()
      this._isMounted &&
        this.setState({
          allWorkOrdersData: data.records,
          lastPage: data.total_pages,
          loading: false,
        });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <ListWithSearchAndPage
          data={this.state.allWorkOrdersData}
          lastPage={this.state.lastPage}
          searchQuery={searchAllWorkOrders}
          titleFieldId={fields.location}
        />
      </div>
    );
  }
}

export default AllWorkOrders;
