import React from "react";
import styled from "react-emotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../constants/colors";

export const StatusBadge = ({
  icon = null,
  text = "",
  backgroundColor = colors.white,
  textColor = colors.black,
  size = "sm",
}) => {
  const fontConfig = {
    sm: `1.3rem`,
    lg: `1.625rem`,
  };

  const StyledBadge = styled("div")`
    .badge-wrapper {
      font-size: ${fontConfig[size]};
    }

    .status-badge {
      color: ${textColor};
      padding: 0.75em;
      background-color: ${backgroundColor ? backgroundColor : colors.white};
      ${backgroundColor === colors.white &&
        `border: 1px solid ${colors.black};`};
    }
  `;

  return (
    <StyledBadge>
      <div className="badge-wrapper">
        <span className="badge badge-secondary w-100 status-badge">
          {icon && <FontAwesomeIcon icon={icon} />} {text}
        </span>
      </div>
    </StyledBadge>
  );
};
