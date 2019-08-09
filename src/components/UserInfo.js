import React, { Component } from "react";
import api from "../queries/api";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: "" };
  }

  componentDidMount() {
    api
      .user()
      .getSettings()
      .then(res => {
        this.setState({ userInfo: res.data });
      });
  }

  render() {
    return <div>Test!</div>;
  }
}

export default UserInfo;
