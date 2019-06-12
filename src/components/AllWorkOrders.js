import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import api from "../queries/api";
import { workOrderFields } from "../queries/fields";
import { signalsWorkOrderStatuses } from "../constants/statuses";

const fields = workOrderFields.baseFields;
const statuses = signalsWorkOrderStatuses;

class AllWorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWorkOrdersData: [],
      location: "",
      currentPage: 1,
      lastPage: 1
    };
  }

  componentDidMount() {
    api
      .allWorkOrders()
      .getAll()
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages
        });
        console.log(res.data);
      });
  }

  handleChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .allWorkOrders()
      .searchAll(this.state.location, this.state.currentPage)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages
        });
        console.log(res.data);
      });
  };

  prevPage = event => {
    event.preventDefault();
    console.log("Prev");
  };

  nextPage = event => {
    event.preventDefault();
    let page = this.state.currentPage;
    console.log("Next");
  };

  render() {
    // make sure the data is not an empty object `{}`
    const isMyJobsDataLoaded = this.state.allWorkOrdersData.length > 0;
    const allWorkOrdersData = isMyJobsDataLoaded
      ? this.state.allWorkOrdersData
      : [];
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faTruck} /> All Work Orders
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search here"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input type="submit" value="Search" className="btn btn-primary" />
            </div>
          </div>
        </form>
        <ul className="list-group list-group-flush">
          {isMyJobsDataLoaded &&
            allWorkOrdersData.map(item => (
              <Link to={`/work-orders/${item.id}`} key={item.id}>
                <li
                  className="list-group-item d-flex row"
                  style={{
                    backgroundColor:
                      statuses[item[fields.status]].backgroundColor,
                    color: statuses[item[fields.status]].textColor
                  }}
                >
                  {/* Location */}
                  <div className="col-12">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    <span>{item[fields.locationAll]}</span>
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
        <form>
          <div className="form-group row">
            <div className="col">
              <button className="btn btn-primary" onClick={this.prevPage}>
                Prev. Page
              </button>
            </div>
            <div className="col">Page {this.state.currentPage}</div>
            <div className="col">
              <button className="btn btn-primary" onClick={this.nextPage}>
                Next Page
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AllWorkOrders;
