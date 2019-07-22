import React from "react";
import StyledFooter from "../../styles/Footer.css.js";

const Footer = ({ body }) => {
  return (
    <div className={StyledFooter}>
      <footer className="card-footer bg-light text-center">{body}</footer>
    </div>
  );
};

export default Footer;
