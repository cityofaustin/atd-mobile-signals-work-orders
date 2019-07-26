import React, { Component } from "react";
import Button from "./Form/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStreetView,
  faSpinner,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";
import { workOrderFields } from "../queries/fields";
import { signalsWorkOrderStatuses } from "../constants/statuses";

const fields = workOrderFields.baseFields;
const statuses = signalsWorkOrderStatuses;

class MyWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWorkOrdersData: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    api
      .myWorkOrders()
      .getAll()
      .then(res => {
        this.setState({ myWorkOrdersData: res.data.records, loading: false });
      });
  }

  render() {
    // make sure the data is not an empty object `{}`
    const isMyJobsDataLoaded = this.state.myWorkOrdersData.length > 0;
    const myWorkOrdersData = isMyJobsDataLoaded
      ? this.state.myWorkOrdersData
      : [];
    if (this.state.myWorkOrderData !== []) {
      return (
        <div>
          <h1>
            <FontAwesomeIcon icon={faStreetView} /> My Work Orders
          </h1>
          <div className="d-flex flex-row">
            <Button
              icon={faWrench}
              text={"New Work Order"}
              linkPath={"/work-order/new/"}
            />
          </div>
          {this.state.loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              size="2x"
              className="atd-spinner"
            />
          ) : (
            ""
          )}
          <ul className="list-group list-group-flush">
            {isMyJobsDataLoaded &&
              myWorkOrdersData.map(item => (
                <Link to={`/work-orders/${item.id}`} key={item.id}>
                  <li
                    className="list-group-item d-flex row"
                    style={{
                      backgroundColor:
                        statuses[item[fields.status]].backgroundColor,
                      color: statuses[item[fields.status]].textColor,
                    }}
                  >
                    {/* Location */}
                    <div className="col-12">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                      <span>{item[fields.location]}</span>
                    </div>
                    {/* Status */}
                    <div className="col-6">
                      <FontAwesomeIcon
                        icon={
                          item[fields.status] &&
                          statuses[item[fields.status]].icon
                        }
                      />
                      <span> {item[fields.status]}</span>
                    </div>
                    {/* Modified at Datetime */}
                    <div className="col-6">
                      <span>{item[fields.modified]}</span>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            <FontAwesomeIcon icon={faStreetView} /> My Work Orders
          </h1>
          <p>You do not have any work orders.</p>
        </div>
      );
    }
  }
}

export default MyWorkOrders;
