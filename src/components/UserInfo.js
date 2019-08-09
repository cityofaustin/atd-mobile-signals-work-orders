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
    console.log(userInfo);
    return (
      <div>
        {this.state.userInfo !== "" && (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle btn-circle font-weight-bold"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {fullName.first[0] + fullName.last[0]}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-item font-weight-bold">
                {fullName.first} {fullName.last}
              </div>
              <div className="dropdown-item">{userInfo[role]}</div>
              <div className="dropdown-item font-weight-light">
                {userInfo[email].email}
              </div>
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
