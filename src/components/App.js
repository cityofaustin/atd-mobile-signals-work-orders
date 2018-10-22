import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import Cookies from "js-cookie";
import Script from "react-load-script";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

// Add bootstrap v4 for styling, layouts, CSS utilites, etc
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Home from "./Home";
import WorkOrderDetails from "./WorkOrderDetails";
import MyWorkOrders from "./MyWorkOrders";
import AllIssuedJobs from "./AllIssuedJobs";
import NewWorkOrder from "./WorkOrder/New";
import EditNewWorkOrder from "./WorkOrder/EditNew";
import { APP_ID } from "../constants/api";

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
    window.app_id = APP_ID;
    window.distribution_key = "dist_2";

    this.state = {
      appId: APP_ID,
      knackUserToken: Cookies.get("knackUserToken"),
      knackObject: null,
      knackJsLoaded: false,
      knackJsLoading: false,
      knackJsError: false
    };
  }

  setKnackUserToken = token => {
    this.setState({ knackUserToken: token });
    // set a cookie to expire in 48 hrs according to Knack documentation:
    // https://www.knack.com/developer-documentation/#users-sessions-amp-remote-logins
    Cookies.set("knackUserToken", token, { expires: 2 });
  };

  handleScriptCreate = () => this.setState({ knackJsLoading: true });

  handleScriptError = error => {
    console.log(error);
    this.setState({ knackJsError: true });
  };

  handleScriptLoad = () => {
    setTimeout(() => {
      console.log(window.Knack);
      this.setState({ knackObject: window.Knack, knackJsLoaded: true });
      Cookies.remove("knackObject");
      Cookies.set("knackObject", window.Knack);
    }, 1000);
  };

  render() {
    return (
      <div className="container">
        <Script
          url={`https://loader.knack.com/${APP_ID}/dist_3/knack.js`}
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad.bind(this)}
        />

        <Router>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  setKnackUserToken={this.setKnackUserToken}
                  isAuthenticated={this.state.knackUserToken}
                  appId={this.state.appId}
                />
              )}
            />
            <PrivateRoute
              component={Home}
              exact
              path="/"
              isAuthenticated={!!this.state.knackUserToken}
            />
            <PrivateRoute
              path="/my-work-orders"
              isAuthenticated={!!this.state.knackUserToken}
              component={MyWorkOrders}
            />
            <PrivateRoute
              path="/all-issued-jobs"
              isAuthenticated={this.state.knackUserToken}
              component={AllIssuedJobs}
            />
            <PrivateRoute
              path="/work-order/new"
              component={NewWorkOrder}
              knackObject={this.state.knackObject}
              isAuthenticated={this.state.knackUserToken}
            />
            <PrivateRoute
              path="/work-order/edit-new/:workOrderId"
              component={EditNewWorkOrder}
              isAuthenticated={this.state.knackUserToken}
            />
            <PrivateRoute
              path="/work-orders/:workOrderId"
              component={WorkOrderDetails}
              isAuthenticated={this.state.knackUserToken}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
