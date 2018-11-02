import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import Header from './Header';

class AllIssuedJobs extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>
          <FontAwesomeIcon icon={faTruck} /> All Issued Jobs
        </h1>
        <code>TODO</code>
      </div>
    );
  }
}

export default AllIssuedJobs;
