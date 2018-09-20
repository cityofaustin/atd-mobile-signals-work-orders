import React, { Component } from "react";
import axios from "axios";
import Script from "react-load-script";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    window.app_id = "5b633d68c04cc40730078ac3";
    let app_id = "5b633d68c04cc40730078ac3";
    let distribution_key = "dist_2";

    console.log(app_id);
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      console.log(persons);
    });
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log("handleScriptCreate");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });

    let KnackApp = window.Knack;
    console.log("Knack", KnackApp);

    let userToken = KnackApp.getUserToken();
    debugger;
    console.log("User Token", userToken);
    setTimeout(() => {
      console.log("User Token", KnackApp.getUserToken());
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Script
          url="https://loader.knack.com/5b633d68c04cc40730078ac3/dist_2/knack.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div id="knack-dist_2">Loading...</div>
      </div>
    );
  }
}

export default App;
