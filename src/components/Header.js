import React from "react";
import UserInfo from "./UserInfo";
import RefreshIcon from "./Shared/RefreshIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StyledHeader from "../styles/Header.css.js";

const Header = props => {
  const isNotHomePath = props.location.pathname !== "/";
  return (
    <StyledHeader>
      <div>
        {isNotHomePath && (
          <FontAwesomeIcon
            className="nav-buttons"
            onClick={() => props.history.goBack()}
            icon={faArrowLeft}
            size="2x"
          />
        )}
        <RefreshIcon />
      </div>
      <h2>{props.currentPage}</h2>
      <UserInfo revokeKnackUserToken={props.revokeKnackUserToken} />
    </StyledHeader>
  );
};

export default Header;
