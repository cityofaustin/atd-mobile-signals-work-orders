import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubHeader = ({ icon, title = "" }) => (
  <h1>
    <h1>
      <FontAwesomeIcon icon={icon} /> {title}
    </h1>
  </h1>
);

export default SubHeader;
