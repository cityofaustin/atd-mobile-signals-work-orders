import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import ListWithSearchAndPage from "./Shared/ListWithSearchAndPages";
import { workOrderFields } from "../queries/fields";
import { getMyWorkOrders, searchMyWorkOrders } from "./WorkOrder/helpers";

const fields = workOrderFields.baseFields;

class MyWorkOrders extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      myWorkOrdersData: [],
      loading: true,
      lastPage: 1,
    };
  }
  componentDidMount() {
    window.analytics.page("My Work Orders");

    this._isMounted = true;
    getMyWorkOrders().then(data => {
      this._isMounted &&
        this.setState({
          myWorkOrdersData: data.records,
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
        <div className="d-flex flex-row">
          <div className="mr-2 mb-2">
            <Link to={`/work-order/new/`}>
              <div className="btn btn-secondary btn-lg">
                <FontAwesomeIcon icon={faWrench} /> New Work Order
              </div>
            </Link>
          </div>
        </div>
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
