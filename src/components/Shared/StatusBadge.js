import React from "react";
import styled from "react-emotion";
import { colors } from "../constants/colors";

const StatusBadge = ({
  icon = null,
  text = "",
  backgroundColor = colors.white,
}) => {
  const StyledBadge = styled.div`
    .badge-wrapper {
      font-size: 1.3rem;
    }

    color: ${backgroundColor ? colors.white : colors.black};
    padding: 0.75em;
    background-color: ${backgroundColor ? backgroundColor : colors.white};
    ${!backgroundColor && `border: 1px solid ${colors.black};`};
  `;

  return (
    <StyledBadge>
      <div className="badge-wrapper">
        <span className="badge w-100">
          {icon && <FontAwesomeIcon icon={icon} />}
          {text}
        </span>
      </div>
    </StyledBadge>
  );
};

export default StatusBadge;
