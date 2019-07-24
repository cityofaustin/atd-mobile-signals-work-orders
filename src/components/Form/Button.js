import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  icon = "",
  text = "Button",
  spacingModifierClass = "mr-2 mb-2",
  linkPath,
}) => (
  <div className={spacingModifierClass}>
    <Link to={linkPath}>
      <div className="btn btn-secondary btn-lg">
        <FontAwesomeIcon icon={icon} /> {text}
      </div>
    </Link>
  </div>
);

export default Button;
