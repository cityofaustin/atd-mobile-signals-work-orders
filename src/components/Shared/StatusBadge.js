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
  const textSizeConfig = {
    sm: `h6`,
    lg: `h5`,
  };

  const TextTag = textSizeConfig[size];

  const StyledBadge = styled("div")`
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
      <span className="badge badge-secondary w-100 status-badge">
        <TextTag className="mb-0">
          {icon && <FontAwesomeIcon icon={icon} />} {text}
        </TextTag>
      </span>
    </StyledBadge>
  );
};
