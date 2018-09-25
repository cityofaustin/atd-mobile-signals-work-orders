import React, { Component } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestMade: false,
      email: "",
      password: "",
      loginError: false,
      isLoggedIn: false
    };
  }

  knackRemoteLogin = e => {
    e.preventDefault();
    axios
      .post(
        `https://api.knack.com/v1/applications/${this.props.appId}/session`,
        {
          email: this.state.email,
          password: this.state.password,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.props.setKnackUserToken(res.data.session.user.token);
      })
      .then(this.setState({ isLoggedIn: true }))

      .catch(error => {
        console.log(error);
        this.setState({ loginError: true });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    this.props.knackUserToken && navigate("/");

    return (
      <div>
        {this.state.loginError && (
          <p style={{ color: "red" }}>Email or password incorrect.</p>
        )}
        <form onSubmit={this.knackRemoteLogin}>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            id="password"
            name="password"
            type="text"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
