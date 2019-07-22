import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StyledHeader from "../styles/Header.css.js";

const Header = props => {
  const isNotHomePath = props.location.pathname !== "/";
  return (
    <StyledHeader>
      {isNotHomePath && (
        <button onClick={() => props.history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
      )}
      <h2>{props.currentPage}</h2>
      <button onClick={props.revokeKnackUserToken}>Log out</button>
    </StyledHeader>
  );
};

export default Header;
