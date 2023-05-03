import React from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.css";

const DropdownMenu = ({ children }) => {
  return (
    <details className="dropdown">
      <summary role="button">
        <a className="dropdonwButton">...</a>
      </summary>
      <ul>{children}</ul>
    </details>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.array,
};

export default DropdownMenu;
