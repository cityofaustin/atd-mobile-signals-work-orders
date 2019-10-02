import React, { Component } from "react";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

import ListWithSearchAndPage from "./Shared/ListWithSearchAndPages";
import PageTitle from "./Shared/PageTitle";
import { StyledPageTitle } from "../styles/PageTitle.css";

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
        <StyledPageTitle>
          <PageTitle icon={faTruck} title={"All Work Orders"} />
        </StyledPageTitle>
        <ListWithSearchAndPage
          data={this.state.allWorkOrdersData}
          lastPage={this.state.lastPage}
          searchQuery={searchAllWorkOrders}
          titleFieldId={fields.locationAll}
        />
      </div>
    );
  }
}

export default AllWorkOrders;
