import React from "react";
import StyledNavFooter from "../../styles/NavFooter.css.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faStreetView,
  faWrench,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";

const navPages = [
  {
    title: "Home",
    link: "/",
    icon: faHome,
  },
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
    title: "New Work Order",
    link: "/work-order/new",
    icon: faWrench,
  },
];

const NavFooter = () => {
  return (
    <StyledNavFooter>
      <ul className="nav justify-content-center">
        {navPages.map((page, i) => (
          <li key={i} className="nav-item">
            <Link to={page.link} className="nav-link">
              <FontAwesomeIcon icon={page.icon} size="2x" />
            </Link>
          </li>
        ))}
      </ul>
    </StyledNavFooter>
  );
};

export default NavFooter;
