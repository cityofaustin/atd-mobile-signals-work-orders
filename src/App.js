import React, { Component } from "react";
import axios from "axios";
import Script from "react-load-script";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // These are config variables that knack.js expects to find on the global
    // window element
    let app_id, distribution_key;
    window.app_id = "5b633d68c04cc40730078ac3";
    window.distribution_key = "dist_2";

    // config variables for date request
    this.sceneKey = "scene_709";
    this.viewKey = "view_1877";

    this.state = {
      scriptLoaded: null,
      scriptError: null,
      knackUserToken: null,
      knackData: {},
      knackDataLoaded: null
    };
  }

  requestKnackViewData(sceneKey, viewKey) {
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
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });

    let KnackApp = window.Knack;

    // TODO: This has to be delayed bc we have to wait for the Knack JS app to
    // initialize in the browser, make a new request, and then finish. It appears
    // this happens with websocket so maybe we can watch for a process to finish?
    setTimeout(() => {
      this.setState({ knackUserToken: KnackApp.getUserToken() });
      this.requestKnackViewData(this.sceneKey, this.viewKey);
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-Knack</h1>
        </header>
        <Script
          url={`https://loader.knack.com/${window.app_id}/dist_2/knack.js`}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        {!this.state.scriptLoaded && <h2>'Loading Knack.js...'</h2>}
        {this.state.scriptLoaded &&
          !this.state.knackDataLoaded && (
            <small style={{ color: "green", display: "block" }}>
              ✅ Base App Loaded. <br />
              {this.state.knackUserToken && (
                <span>👤 User Token Active. Requesting Data...</span>
              )}
              <br />
            </small>
          )}

        {this.state.knackDataLoaded && (
          <div>
            <h3>Data 🎉</h3>
            <code>{JSON.stringify(this.state.knackData)}</code>
          </div>
        )}
      </div>
    );
  }
}

export default App;
