import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const RefreshIcon = () => {
  return (
    <>
      <FontAwesomeIcon
        className="nav-buttons"
        onClick={() => console.log("You clicked the button!")}
        icon={faRedoAlt}
        size="2x"
      />
    </>
  );
};

export default RefreshIcon;
