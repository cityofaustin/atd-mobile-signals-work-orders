import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageTitle = ({ icon, title = "" }) => (
  <h2>
    <FontAwesomeIcon icon={icon} /> {title}
  </h2>
);

export default PageTitle;
