import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder="Email" />
          <br />
          <label htmlFor="password">Password</label>
          <input id="password" type="text" placeholder="Password" />
        </form>
      </div>
    );
  }
}

export default Login;
