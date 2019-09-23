import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const RefreshIcon = () => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <>
      <FontAwesomeIcon
        className="nav-buttons"
        onClick={handleRefreshClick}
        icon={faRedoAlt}
        size="2x"
      />
    </>
  );
};

export default RefreshIcon;
