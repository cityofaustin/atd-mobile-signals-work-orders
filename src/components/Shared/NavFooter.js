import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavFooter,
  StyledNavFooterButtons,
} from "../../styles/NavFooter.css.js";
import { colors } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faStreetView,
  faPlus,
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
    icon: faPlus,
  },
];

const NavFooter = props => {
  let iconColor = "";
  return (
    <StyledNavFooter>
      <ul className="nav nav-fill justify-content-center">
        {navPages.map((page, i) => {
          // Set icon color based on whether current path is equal to link path
          iconColor =
            page.link === props.location.pathname
              ? colors.activeNavFooter
              : colors.inactiveNavFooter;

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
