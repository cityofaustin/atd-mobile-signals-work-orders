import React from "react";
import StyledFormFooter from "../../styles/FormFooter.css.js";

const FormFooter = ({ body }) => {
  return (
    <div className="text-center">
      <StyledFormFooter>{body}</StyledFormFooter>
    </div>
  );
};

export default FormFooter;
