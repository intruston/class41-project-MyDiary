import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const NavbarLinks = ({ link, svg, text }) => {
  return (
    <li>
      <Link to={link}>
        <div className="svg-holder">{svg}</div>
        <div className="link-text">{text}</div>
      </Link>
    </li>
  );
};

// This required for Eslint, without this: { props } make a problem.
NavbarLinks.propTypes = {
  link: PropTypes.string.isRequired,
  svg: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavbarLinks;
