import React, { Component } from "react";
import axios from "axios";
import { Router, Redirect } from "@reach/router";

import Login from "./Login";
import Data from "./Data";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // These are config variables that knack.js expects to find on the global
    // window element
    let app_id, distribution_key;
    window.app_id = "5b633d68c04cc40730078ac3";
    window.distribution_key = "dist_2";

    // config variables for data request
    this.sceneKey = "scene_709";
    this.viewKey = "view_1877";

    this.state = {
      knackUserToken: null,
      knackData: {},
      knackDataLoaded: null
    };
  }

  setKnackUserToken = token => {
    this.setState({ knackUserToken: token });
  };

  requestKnackViewData = (sceneKey, viewKey) => {
    debugger;
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-Knack</h1>
        </header>

        <Router>
          <Login path="/login" />
          <Data
            path="/data"
            requestKnackViewData={this.requestKnackViewData.bind(this)}
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
