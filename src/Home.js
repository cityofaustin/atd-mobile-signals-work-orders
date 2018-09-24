import React, { Component } from "react";

class Home extends Component {
  componentDidMount() {
    // config variables for data request
    const sceneKey = "scene_709";
    const viewKey = "view_1877";
    this.props.requestKnackViewData(sceneKey, viewKey);
  }

  render() {
    return (
      <div>
        <h1>🛴 home </h1>
        <code>{JSON.stringify(this.props.knackData)}</code>
      </div>
    );
  }
}

export default Home;
