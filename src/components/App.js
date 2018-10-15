import React, { Component } from "react";
import axios from "axios";
import { Router, navigate } from "@reach/router";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

// Add bootstrap v4 for styling, layouts, CSS utilites, etc
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login";
import Home from "./Home";
import Data from "./Data";
import WorkOrderDetails from "./WorkOrderDetails";
import MyWorkOrders from "./MyWorkOrders";
import AllIssuedJobs from "./AllIssuedJobs";
import NewWorkOrder from "./NewWorkOrder/index";

import "../styles/App.css";

// Load Font Awesome v5 SVG / JS version
// https://github.com/FortAwesome/react-fontawesome
library.add(faStroopwafel);

class App extends Component {
  constructor(props) {
    super(props);

    // These are config variables that knack.js expects to find on the global
    // window element
    let app_id, distribution_key;
    window.app_id = "5b633d68c04cc40730078ac3";
    window.distribution_key = "dist_2";

    this.state = {
      appId: window.app_id,
      knackUserToken: Cookies.get("knackUserToken"),
      knackData: {},
      knackDataLoaded: null
    };
  }

  setKnackUserToken = token => {
    this.setState({ knackUserToken: token });
    // set a cookie to expire in 48 hrs according to Knack documentation:
    // https://www.knack.com/developer-documentation/#users-sessions-amp-remote-logins
    Cookies.set("knackUserToken", token, { expires: 2 });
  };

  requestKnackViewData = (sceneKey, viewKey) => {
    axios
      .get(
        `https://api.knack.com/v1/pages/${sceneKey}/views/${viewKey}/records`,
        {
          headers: {
            "X-Knack-Application-Id": "5b633d68c04cc40730078ac3",
            "X-Knack-REST-API-KEY": "knack",
            Authorization: this.state.knackUserToken,
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({
          // Throw the knack records into the React App state
          knackDataLoaded: true,
          knackData: res.data.records,
          // We might as well keep track of pagination values
          knackCurrentPage: res.data.current_page,
          knackTotalPages: res.data.total_pages,
          knackTotalRecords: res.data.total_records
        });
      });
  };

  render() {
    // If we're not authenticated, go back to the login page
    !this.state.knackUserToken && navigate("/login");

    return (
      <div className="container">
        <Router>
          <Login
            path="/login"
            setKnackUserToken={this.setKnackUserToken}
            knackUserToken={this.state.knackUserToken}
            appId={this.state.appId}
          />
          <Home path="/" knackUserToken={this.state.knackUserToken} />
          <MyWorkOrders
            path="/my-work-orders"
            knackUserToken={this.state.knackUserToken}
          />
          <AllIssuedJobs
            path="/all-issued-jobs"
            knackUserToken={this.state.knackUserToken}
          />
          <NewWorkOrder
            path="/work-order/new"
            knackUserToken={this.state.knackUserToken}
          />
          <WorkOrderDetails
            path="/work-orders/:workOrderId"
            knackUserToken={this.state.knackUserToken}
          />
          <Data
            path="/data"
            requestKnackViewData={this.requestKnackViewData}
            setKnackUserToken={this.setKnackUserToken}
            knackUserToken={this.state.knackUserToken}
            knackData={this.state.knackData}
            knackDataLoaded={this.state.knackDataLoaded}
            sceneKey={this.sceneKey}
            viewKey={this.viewKey}
          />
        </Router>
      </div>
    );
  }
}

export default App;
