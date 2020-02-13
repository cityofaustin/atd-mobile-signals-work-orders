import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../Shared/StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";

import styled from "react-emotion";
import { colors } from "../../constants/colors";
import { workOrderFields } from "../../queries/fields";
import { signalsWorkOrderStatuses } from "../../constants/statuses";

const fields = workOrderFields.baseFields;
const statuses = signalsWorkOrderStatuses;

const StyledWorkOrderLinkText = styled("div")`
  color: ${colors.black};
`;
class ListWithSearchAndPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knackData: [],
      filteredData: [],
      isFiltered: false,
      loading: true,
      location: "",
      currentPage: 1,
      lastPage: 1,
      status: "All",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        knackData: nextProps.data,
        lastPage: nextProps.lastPage,
        loading: nextProps.loading,
      });
    }
  }

  handleChange = event => {
    this.setState({ location: event.target.value });
  };

  handleSearch = event => {
    event.preventDefault();
    this.setState({ knackData: [], loading: true });
    this.props.searchQuery(this.state.location, 1).then(data => {
      this.setState({
        knackData: data.records,
        loading: false,
        lastPage: data.total_pages,
        currentPage: 1,
        isFiltered: false,
        status: "All",
      });
    });
  };

  updatePage = pageNumber => {
    this.setState({
      knackData: [],
      loading: true,
      currentPage: pageNumber,
    });

    this.props.searchQuery(this.state.location, pageNumber).then(data => {
      if (this.state.isFiltered) {
        this.filterWorkOrders(this.state.status, data.records);
      }
      this.setState({
        knackData: data.records,
        lastPage: data.total_pages,
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

  filterWorkOrders = (type, records) => {
    const data = records;
    if (type === "All") {
      this.setState({ isFiltered: false, status: type, filteredData: [] });
      return true;
    }
    const filteredData = data.filter(item => {
      return item[fields.status] === type;
    });
    this.setState({ status: type, isFiltered: true, filteredData });
  };

  renderFilterButton = status => (
    <button
      type="button"
      className={`btn ${
        this.state.status === status ? "btn-primary" : "btn-outline-primary"
      }`}
      onClick={e => this.filterWorkOrders(status, this.state.knackData)}
    >
      {status}
    </button>
  );

  renderListItem = item => (
    <Link to={`/work-orders/${item.id}`} key={item.id}>
      <StyledWorkOrderLinkText>
        <li className="list-group-item d-flex row">
          {/* Location */}
          <h5 className="col-12 pb-2 font-weight-bold">
            <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
            {item[this.props.titleFieldId]}
          </h5>
          {/* Status Badge */}
          <div className="col-sm-12 col-md-4">
            <StatusBadge
              icon={statuses[item[fields.status]].icon}
              text={item[fields.status]}
              backgroundColor={statuses[item[fields.status]].backgroundColor}
              textColor={statuses[item[fields.status]].textColor}
              size="lg"
            />
          </div>
          <div className="col-sm-6 col-md-4 pt-2 text-center">
            {item[fields.leadTechnicianRaw][0]
              ? `${item[fields.leadTechnicianRaw][0].identifier}`
              : ""}
          </div>
          {/* Modified at Datetime */}
          <div className="col-sm-6 col-md-4 pt-2 text-center">
            <span>{item[fields.modified]}</span>
          </div>
        </li>
      </StyledWorkOrderLinkText>
    </Link>
  );

  render() {
    // make sure the data is not an empty object `{}`
    const isDataLoaded = this.state.knackData.length > 0;
    const knackData = isDataLoaded ? this.state.knackData : [];

    return (
      <div>
        <form onSubmit={this.handleSearch.bind(this)}>
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
        <div className="text-center">
          <div
            className="btn-group btn-group-lg mb-3"
            role="group"
            aria-label="Basic example"
          >
            {this.renderFilterButton("All")}
            {this.renderFilterButton("Assigned")}
            {this.renderFilterButton("In Progress")}
            {this.renderFilterButton("Submitted")}
            {this.renderFilterButton("Closed")}
          </div>
        </div>
        {this.state.loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            size="2x"
            className="atd-spinner--padded"
          />
        ) : (
          <ul className="list-group list-group-flush">
            {this.state.isFiltered &&
              this.state.filteredData.map(item => this.renderListItem(item))}
            {isDataLoaded &&
              !this.state.isFiltered &&
              knackData.map(item => this.renderListItem(item))}
          </ul>
        )}
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

export default ListWithSearchAndPage;
