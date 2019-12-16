import React, { Component } from "react";
import api from "../queries/api";
import { userFields } from "../queries/fields";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

var pckg = require("../../package.json");

const fields = userFields;
class UserInfo extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    this.state = { userInfo: "", dropdownOpen: false };
  }

  componentDidMount() {
    api
      .user()
      .getInfo()
      .then(res => {
        this.setState({ userInfo: res.data });
      });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { name, role, email } = fields.info;
    const userInfo = this.state.userInfo;
    const fullName = userInfo[name];
    return (
      <div>
        {this.state.userInfo !== "" ? (
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className="btn-circle font-weight-bold">
              {fullName.first[0] + fullName.last[0]}
            </DropdownToggle>
            <DropdownMenu right positionfixed="true">
              <DropdownItem className="font-weight-bold">
                {fullName.first} {fullName.last}
              </DropdownItem>
              <DropdownItem>{userInfo[role]}</DropdownItem>
              <DropdownItem className="font-weight-light">
                {userInfo[email].email}
              </DropdownItem>
              <DropdownItem>
                <Button
                  color="danger"
                  onClick={this.props.revokeKnackUserToken}
                  className="btn-lg mt-1"
                >
                  Log out
                </Button>
                <span className="align-bottom font-weight-light ml-2">
                  v{pckg.version}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            color="danger"
            onClick={this.props.revokeKnackUserToken}
            className="btn-lg ml-4 mt-1"
          >
            Log out
          </Button>
        )}
      </div>
    );
  }
}

export default UserInfo;
