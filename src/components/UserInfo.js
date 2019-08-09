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
      .getInfo()
      .then(res => {
        this.setState({ userInfo: res.data });
      });
  }

  render() {
    return (
      <div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Right-aligned menu
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button">
              User First and Last Name
            </button>
            <button class="dropdown-item" type="button">
              Role
            </button>
            <button onClick={this.props.revokeKnackUserToken}>Log out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
