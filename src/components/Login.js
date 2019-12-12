import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SubmitButton from "./Form/SubmitButton";
import {
  formStyles,
  pageStyles,
  buttonStyles,
  inputStyles,
  labelStyles,
  errorMessageStyles,
} from "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestMade: false,
      email: "",
      password: "",
      loginError: false,
      isSubmitting: false,
    };
  }

  knackRemoteLogin = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { email, password } = this.state;
    const headers = { "Content-type": "application/json" };
    axios
      .post(
        `https://api.knack.com/v1/applications/${this.props.appId}/session`,
        { email, password, headers }
      )
      .then(res => {
        this.setState({ isSubmitting: false });
        this.props.setKnackUserToken(res.data.session.user.token);
        const userId = res.data.session.user.id;
        window.analytics.identify(userId, {
          email: email,
        });
      })
      .catch(error => {
        this.setState({ loginError: true, isSubmitting: false });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, loginError: false });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className={pageStyles}>
        <p className={errorMessageStyles}>
          {this.state.loginError ? "Email or password incorrect." : ""}
        </p>
        <h1>Login</h1>
        <form
          className={formStyles}
          onSubmit={this.knackRemoteLogin.bind(this)}
        >
          <label className={labelStyles} htmlFor="email">
            Email
          </label>
          <input
            className={inputStyles}
            onChange={this.handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <label className={labelStyles} htmlFor="password">
            Password
          </label>
          <input
            className={inputStyles}
            onChange={this.handleChange}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <SubmitButton
            style={buttonStyles}
            text={"Login"}
            isSubmitting={this.state.isSubmitting}
          />
        </form>
      </div>
    );
  }
}

export default Login;
