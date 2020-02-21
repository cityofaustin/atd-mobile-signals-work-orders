import React from "react";
import UserInfo from "./UserInfo";
import RefreshIcon from "./Shared/RefreshIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StyledHeader from "../styles/Header.css.js";

const Header = ({ location, history, revokeKnackUserToken, pages }) => {
  const isNotHomePath = location.pathname !== "/";
  let currentPage = pages.find(page => page.path === location.pathname);
  console.log(location.pathname, currentPage);
  // If there wasn't an exact match between the location.pathname & the imported
  // pages listing...
  if (!currentPage) {
    // match by page title string
    if (location.pathname.includes("/work-order/edit")) {
      currentPage = pages.find(page => page.pageTitle === "Edit Work Order");
    } else if (location.pathname.includes("/new-time-log")) {
      currentPage = pages.find(page => page.pageTitle === "New Time Log");
    } else if (location.pathname.includes("/edit-time-log")) {
      currentPage = pages.find(page => page.pageTitle === "Edit Time Log");
    } else if (location.pathname.includes("/work-orders")) {
      // Work Order Details needs to go last since may of our paths include "/work-order"
      currentPage = pages.find(page => page.pageTitle === "Work Order Details");
    }
  }

  return (
    <StyledHeader>
      <div className="p-2">
        <div className="row">
          <div className="col-auto align-items-center d-flex">
            {isNotHomePath && (
              <FontAwesomeIcon
                className="nav-buttons"
                onClick={() => history.goBack()}
                icon={faArrowLeft}
                size="2x"
              />
            )}
            <RefreshIcon />
          </div>
          <div className="col text-center align-items-center justify-content-center d-flex">
            <h1 className="h2 mb-0">
              <FontAwesomeIcon icon={currentPage ? currentPage.icon : ""} />{" "}
              {currentPage ? currentPage.pageTitle : ""}
            </h1>
          </div>
          <div className="col-auto align-items-center d-flex">
            <UserInfo revokeKnackUserToken={revokeKnackUserToken} />
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
