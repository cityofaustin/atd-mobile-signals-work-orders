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
    // make sure the data is not an empty object `{}`
    const markingsData =
      this.props.knackData.length > 0 ? this.props.knackData : [];
    console.log("markingsData", markingsData);

    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faRoad} /> Markings Work Orders
        </h1>

        <ul className="list-group">
          {markingsData.map(item => (
            <li className="list-group-item d-flex row" key={item.id}>
              {/* Location */}
              <div className="col-12">
                <span>{item.field_2287}</span>
              </div>
              {/* Status */}
              <div className="col-6">
                <span>{item.field_2181}</span>
              </div>
              {/* Created Date */}
              <div className="col-6">
                <span>{item.field_2148}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
