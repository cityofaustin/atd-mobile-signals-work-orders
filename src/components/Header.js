import React from "react";
import UserInfo from "./UserInfo";
import RefreshIcon from "./Shared/RefreshIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StyledHeader from "../styles/Header.css.js";

const Header = ({ location, history, revokeKnackUserToken, pages }) => {
  const isNotHomePath = location.pathname !== "/";
  const currentPage = pages.find(page => page.path === location.pathname);

  return (
    <StyledHeader>
      <div>
        {isNotHomePath && (
          <FontAwesomeIcon
            className="nav-buttons"
            onClick={() => history.goBack()}
            icon={faArrowLeft}
            size="lg"
          />
        )}
        <RefreshIcon />
      </div>
      <h1>
        <FontAwesomeIcon icon={currentPage ? currentPage.icon : ""} />{" "}
        {currentPage ? currentPage.pageTitle : ""}
      </h1>
      <UserInfo revokeKnackUserToken={revokeKnackUserToken} />
    </StyledHeader>
  );
};

export default Header;
