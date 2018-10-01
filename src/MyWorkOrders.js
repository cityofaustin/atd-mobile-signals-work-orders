import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStreetView
} from "@fortawesome/free-solid-svg-icons";

import statusMap from "./constants/statuses";

const fields = {
  modified: "field_2150",
  status: "field_2181",
  location: "field_2287"
};

class MyWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWorkOrdersData: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_776/views/view_2037/records`,
        {
          headers: {
            "X-Knack-Application-Id": "5b633d68c04cc40730078ac3",
            "X-Knack-REST-API-KEY": "knack",
            Authorization: this.props.knackUserToken,
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ myWorkOrdersData: res.data.records });
      });
  }

  render() {
    // make sure the data is not an empty object `{}`
    const isMyJobsDataLoaded = this.state.myWorkOrdersData.length > 0;
    const myWorkOrdersData = isMyJobsDataLoaded
      ? this.state.myWorkOrdersData
      : [];

    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faStreetView} /> My Work Orders
        </h1>
        <ul className="list-group list-group-flush">
          {isMyJobsDataLoaded &&
            myWorkOrdersData.map(item => (
              <Link to={`/markings/${item.id}`} key={item.id}>
                <li
                  className="list-group-item d-flex row"
                  style={{
                    backgroundColor:
                      statusMap[item[fields.status]].backgroundColor,
                    color: statusMap[item[fields.status]].textColor
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
                        statusMap[item[fields.status]].icon
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
  }
}

export default MyWorkOrders;
