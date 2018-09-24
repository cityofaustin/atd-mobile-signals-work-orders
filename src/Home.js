import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>🛴 home </h1>
        <code>{this.props.knackUserToken}</code>
      </div>
    );
  }
}

export default Home;
