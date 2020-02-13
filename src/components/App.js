import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import Cookies from "js-cookie";
import Script from "react-load-script";
import moment from "moment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Add bootstrap v4 for styling, layouts, CSS utilites, etc
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login";
import Header from "./Header";
import NavFooter from "./Shared/NavFooter";

import { APP_ID } from "../constants/api";

import "../styles/App.css";
import pages from "../constants/pages";

// Load Font Awesome v5 SVG / JS version
// https://github.com/FortAwesome/react-fontawesome
library.add(faStroopwafel);

const theme = {
  colorWhite: "#fff",
  colorBlue: "#377eb8",
  colorGrey: "#aeaeae",
  colorGreen: "#4daf4a",
  colorRed: "#e41a1c",
  colorBlack: "#220e01",
  inputBackgroundColor: "rgba(238, 238, 238, .6)",
  inputBorderColor: "rgba(0, 0, 0, .38)",
};

class App extends Component {
  constructor(props) {
    super(props);

    // These are config variables that knack.js expects to find on the global
    // window element
    window.app_id = APP_ID;
    window.distribution_key = "dist_2";
    const cookieToken =
      Cookies.get("knackUserToken") === "false"
        ? false
        : Cookies.get("knackUserToken");

    this.state = {
      appId: APP_ID,
      knackUserToken: cookieToken,
      knackObject: null,
      knackJsLoaded: false,
      knackJsLoading: false,
      knackJsError: false,
      isLoggedIn: false,
    };
  }

  setKnackUserToken = token => {
    // Set cookie first to prevent API call in UserInfo from failing to auth
    // Set additional expiration cookie to timestamp token creation
    Cookies.set(
      "knackUserTokenExpiration",
      moment()
        .add(2, "days")
        .format(),
      { expires: 2 }
    );
    Cookies.set("knackUserToken", token, { expires: 2 });
    this.setState({ knackUserToken: token, isLoggedIn: true });
    // set a cookie to expire in 48 hrs according to Knack documentation:
    // https://www.knack.com/developer-documentation/#users-sessions-amp-remote-logins
  };

  revokeKnackUserToken = () => {
    this.setState({ knackUserToken: false, isLoggedIn: false });
    Cookies.remove("knackUserToken");
    Cookies.remove("knackUserTokenExpiration");
  };

  handleScriptCreate = () => this.setState({ knackJsLoading: true });

  handleScriptError = error => {
    console.log(error);
    this.setState({ knackJsError: true });
  };

  handleScriptLoad = () => {
    // The knack objects are ready when the script loads. They get updated after
    // the script executes. With the setTimeout, we wait a breath after the
    // script loads, let is execute, then grab the Knack.js objects. Not perfect.

    setTimeout(() => {
      this.setState({ knackObject: window.Knack, knackJsLoaded: true });
    }, 2000);
  };

  isUserLoggedIn = () => {
    const knackUserTokenExpiration = Cookies.get("knackUserTokenExpiration");
    const knackUserToken = Cookies.get("knackUserToken");
    // if knackUserToken exists and is unexpired, user is logged in
    return (
      !!knackUserToken &&
      !!knackUserTokenExpiration &&
      knackUserTokenExpiration > moment().format()
    );
  };

  componentDidUpdate(prevProps) {
    // Check for route change and for isUserLoggedIn, then switch state that renders Redirect to login
    this.props.location.pathname !== prevProps.location.pathname &&
      !this.isUserLoggedIn() &&
      this.setState({ isLoggedIn: false });

    // Set state.isLoggedIn to true if cookies exist
    // since state reverts to false when navigating away from and back to app
    this.isUserLoggedIn() &&
      this.state.isLoggedIn === false &&
      this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Script
            url={`https://loader.knack.com/${APP_ID}/dist_3/knack.js`}
            onCreate={this.handleScriptCreate}
            onError={this.handleScriptError}
            onLoad={this.handleScriptLoad.bind(this)}
          />

          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                setKnackUserToken={this.setKnackUserToken}
                isAuthenticated={this.state.isLoggedIn && this.isUserLoggedIn()}
                appId={this.state.appId}
              />
            )}
          />
          {/* if user is not logged in, Redirect to login page */}
          {!this.state.isLoggedIn &&
            !this.isUserLoggedIn() && <Redirect to="/login" />}
          {this.state.isLoggedIn ? (
            <div>
              <Route
                path="/"
                render={props => (
                  <>
                    <Header
                      {...props}
                      revokeKnackUserToken={this.revokeKnackUserToken}
                      pages={pages}
                    />
                    <NavFooter {...props} />
                  </>
                )}
              />
              <div className="container">
                {pages.map(page => (
                  <Route
                    render={props => <page.component {...props} />}
                    path={page.path}
                    exact={page.exact}
                  />
                ))}
              </div>
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faSpinner}
              size="2x"
              className="atd-spinner"
            />
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(props => <App {...props} />);
