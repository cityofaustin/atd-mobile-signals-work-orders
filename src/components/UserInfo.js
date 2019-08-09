import React, { Component } from "react";
import api from "../queries/api";
import { userFields } from "../queries/fields";

const fields = userFields;
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
    const { name, role, email } = fields.info;
    const userInfo = this.state.userInfo;
    const fullName = userInfo[name];

    return (
      <div>
        {this.state.userInfo !== "" && (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle btn-circle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {fullName.first[0] + fullName.last[0]}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button">
                {fullName.first} {fullName.last}
              </button>
              <button className="dropdown-item" type="button">
                {userInfo[role]}
              </button>
              <button className="dropdown-item" type="button">
                {userInfo[email].email}
              </button>
              <button
                className="btn btn-danger ml-4 mt-1"
                onClick={this.props.revokeKnackUserToken}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserInfo;
