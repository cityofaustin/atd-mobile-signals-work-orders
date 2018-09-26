import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faMapMarkerAlt,
  faClock,
  faFlagCheckered,
  faCheckCircle,
  faTimes,
  faTruck,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const statusMap = {
  "ON HOLD": {
    icon: faClock,
    backgroundColor: "#aeaeae",
    textColor: "white"
  },
  "FINAL REVIEW": {
    icon: faFlagCheckered,
    backgroundColor: "#4daf4a",
    textColor: "white"
  },
  "NEED TO BE ISSUED": {
    icon: faExclamationTriangle,
    backgroundColor: "#e41a1c",
    textColor: "white"
  },
  ISSUED: {
    icon: faTruck,
    backgroundColor: "#377eb8",
    textColor: "white"
  },
  CLOSED: {
    icon: faCheckCircle,
    backgroundColor: "white",
    textColor: "black"
  },
  CANCELLED: {
    icon: faTimes,
    backgroundColor: "white",
    textColor: "black"
  }
};

class Home extends Component {
  componentDidMount() {
    // config variables for data request
    const sceneKey = "scene_709";
    const viewKey = "view_1877";
    this.props.requestKnackViewData(sceneKey, viewKey);
  }

  render() {
    // make sure the data is not an empty object `{}`
    const isMarkingsDataLoaded = this.props.knackData.length > 0;
    const markingsData = isMarkingsDataLoaded ? this.props.knackData : [];

    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faRoad} /> Markings Work Orders
        </h1>

        <ul className="list-group">
          {isMarkingsDataLoaded &&
            markingsData.map(item => (
              <li
                className="list-group-item d-flex row"
                key={item.id}
                style={{
                  backgroundColor: statusMap[item.field_2181].backgroundColor,
                  color: statusMap[item.field_2181].textColor
                }}
              >
                {/* Location */}
                <div className="col-12">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{item.field_2287}</span>
                </div>
                {/* Status */}
                <div className="col-6">
                  <FontAwesomeIcon
                    icon={item.field_2181 && statusMap[item.field_2181].icon}
                  />
                  <span> {item.field_2181}</span>
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
