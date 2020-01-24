import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  icon = "",
  text = "Submit",
  modifierClasses = "mr-2 mb-2",
  linkPath = "/",
  size = "btn-lg",
  color = "secondary",
}) => (
  <div className={modifierClasses}>
    <Link to={linkPath}>
      <div className={`btn btn-${color} ${size}`}>
        <FontAwesomeIcon icon={icon} /> {text}
      </div>
    </Link>
  </div>
);

export default Button;
