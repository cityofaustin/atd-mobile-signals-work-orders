import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Header = ({ icon, title = "" }) => (
  <h1>
    <FontAwesomeIcon icon={icon} />
    {title === "" ? (
      <FontAwesomeIcon icon={faSpinner} className="atd-spinner" />
    ) : (
      ` ${title}`
    )}
  </h1>
);

export default Header;
