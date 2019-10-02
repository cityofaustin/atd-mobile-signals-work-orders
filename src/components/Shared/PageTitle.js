import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageTitle = ({ icon, title = "" }) => (
  <h1>
    <FontAwesomeIcon icon={icon} /> {title}
  </h1>
);

export default PageTitle;
