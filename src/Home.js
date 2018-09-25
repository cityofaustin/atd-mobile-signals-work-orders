import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

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
        <h1>
          <FontAwesomeIcon icon={faRoad} /> Markings Work Orders
        </h1>

        <code>{JSON.stringify(this.props.knackData)}</code>
      </div>
    );
  }
}

export default Home;
