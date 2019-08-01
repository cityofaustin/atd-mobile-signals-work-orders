import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faMapMarkerAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

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
      loading: false,
      location: "",
      currentPage: 1,
      lastPage: 1,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    api
      .allWorkOrders()
      .getAll()
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages,
          loading: false,
        });
      });
  }

  handleChange = event => {
    this.setState({
      location: event.target.value,
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.setState({ allWorkOrdersData: [], loading: true });
    api
      .allWorkOrders()
      .searchAll(this.state.location, 1)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          loading: false,
          lastPage: res.data.total_pages,
          currentPage: 1,
        });
      });
  };

  updatePage = pageNumber => {
    this.setState({
      allWorkOrdersData: [],
      loading: true,
      currentPage: pageNumber,
    });
    api
      .allWorkOrders()
      .searchAll(this.state.location, pageNumber)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages,
          loading: false,
        });
      });
    window.scrollTo(0, 0);
  };

  prevPage = event => {
    event.preventDefault();
    // if currentPage !== 1, API call for prev page
    if (this.state.currentPage !== 1) {
      const prevPage = this.state.currentPage - 1;
      this.updatePage(prevPage);
    }
  };

  nextPage = event => {
    event.preventDefault();
    // if currentPage === lastPage, nothing, else API call for next page
    if (this.state.currentPage !== this.state.lastPage) {
      const nextPage = this.state.currentPage + 1;
      this.updatePage(nextPage);
    }
  };

  render() {
    // make sure the data is not an empty object `{}`
    const isJobsDataLoaded = this.state.allWorkOrdersData.length > 0;
    const allWorkOrdersData = isJobsDataLoaded
      ? this.state.allWorkOrdersData
      : [];
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faTruck} /> All Work Orders
        </h1>
        <form onSubmit={this.handleSearch}>
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
              <input
                type="submit"
                value="Search"
                className="btn btn-primary btn-lg"
              />
            </div>
          </div>
        </form>
        {this.state.loading ? (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
        ) : (
          ""
        )}
        <ul className="list-group list-group-flush">
          {isJobsDataLoaded &&
            allWorkOrdersData.map(item => (
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
          <br />
          <div className="form-group row justify-content-center">
            <div className="col-auto">
              <button
                className="btn btn-primary btn-lg"
                onClick={this.prevPage}
              >
                Prev. Page
              </button>
            </div>
            <div className="col-auto">
              Page {this.state.currentPage} of {this.state.lastPage}
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary btn-lg"
                onClick={this.nextPage}
              >
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
