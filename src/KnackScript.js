import React, { Component } from "react";
import Script from "react-load-script";

class KnackScript extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scriptLoaded: null,
      scriptError: null
    };
  }

  handleScriptCreate = () => {
    this.setState({ scriptLoaded: false });
  };

  handleScriptError = () => {
    this.setState({ scriptError: true });
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });

    let KnackApp = window.Knack;

    // **TODO**
    // This request has to be delayed bc we have to wait for the Knack JS app to
    // initialize in the browser, make a new request, and then finish. It appears
    // this happens with websocket so maybe we can watch for a process to finish?
    //
    // This library might work better than react-load-script:
    // https://github.com/leozdgao/react-async-script-loader#readme
    setTimeout(() => {
      this.props.setKnackUserToken(KnackApp.getUserToken());
    }, 2000);
  };

  render() {
    return (
      <div>
        {!this.state.scriptLoaded && <h2>'Loading Knack.js...'</h2>}
        <Script
          url={`https://loader.knack.com/${window.app_id}/dist_2/knack.js`}
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
        {this.state.scriptLoaded && (
          <small style={{ color: "green", display: "block" }}>
            ✅ Base App Loaded. <br />
          </small>
        )}
      </div>
    );
  }
}

export default KnackScript;
