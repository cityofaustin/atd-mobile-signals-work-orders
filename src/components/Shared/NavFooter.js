import React from "react";
import {
  StyledNavFooter,
  StyledNavFooterButtons,
} from "../../styles/NavFooter.css.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faStreetView,
  faWrench,
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

const linkColors = {
  inactive: "#6C757C",
  active: "#307BFF",
};

const NavFooter = props => {
  let iconColor = "";
  return (
    <StyledNavFooter>
      <ul className="nav nav-fill justify-content-center">
        {navPages.map((page, i) => {
          // Set icon color based on whether current path is equal to link path
          iconColor =
            page.link === props.location.pathname
              ? linkColors.active
              : linkColors.inactive;

          return (
            <li key={i} className={`${StyledNavFooterButtons} nav-item`}>
              <Link to={page.link} className="nav-link">
                <FontAwesomeIcon color={iconColor} icon={page.icon} size="3x" />
              </Link>
            </li>
          );
        })}
      </ul>
    </StyledNavFooter>
  );
};

export default NavFooter;
