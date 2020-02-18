import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faStreetView,
  faPlus,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const mainPages = [
  {
    title: "My Work Orders",
    link: "/my-work-orders",
    icon: faStreetView,
  },
  {
    title: "All Work Orders",
    link: "/all-work-orders",
    icon: faTruck,
  },
  {
    title: "Search Signals",
    link: "/assets",
    icon: faMapMarkerAlt,
  },
  {
    title: "New Work Order",
    link: "/work-order/new",
    icon: faPlus,
  },
];

class Home extends Component {
  componentDidMount() {
    window.analytics.page("Home");
  }

  render() {
    return (
      <div>
        <ul className="list-group-flush list-group">
          {mainPages.map((page, i) => (
            <li className="list-group-item" key={i}>
              <Link to={page.link}>
                <h3>
                  <FontAwesomeIcon icon={page.icon} /> {page.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
