<<<<<<< HEAD
import React, { Component } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faStreetView,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

const mainPages = [
  {
    title: "My Work Orders",
    link: "/my-work-orders",
    icon: faStreetView
  },
  {
    title: "All Issued Jobs",
    link: "/all-issued-jobs",
    icon: faTruck
  },
  {
    title: "New Work Order",
    link: "/new-work-order",
    icon: faWrench
  }
];

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faHome} /> Home
        </h1>

        <ul className="list-group">
          {mainPages.map(page => (
            <li className="list-group-item">
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
=======
import React, { Component } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faStreetView,
  faWrench
} from "@fortawesome/free-solid-svg-icons";

const mainPages = [
  {
    title: "My Work Orders",
    link: "/my-work-orders",
    icon: faStreetView
  },
  {
    title: "All Issued Jobs",
    link: "/all-issued-jobs",
    icon: faTruck
  },
  {
    title: "New Work Order",
    link: "/new-work-order",
    icon: faWrench
  }
];

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faHome} /> Home
        </h1>

        <ul className="list-group-flush list-group">
          {mainPages.map(page => (
            <li className="list-group-item">
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
>>>>>>> a74c96183bf864bcfe9ca95a5551567272ce447a
