import React from "react";
import Logo from "../img/blogLogo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with &#127867; and <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
