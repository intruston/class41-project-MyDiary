import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ onClick, content, color }) => {
  return (
    <button className={`generic-use-button ${color}`} onClick={onClick}>
      {content}
    </button>
  );
};
// This required for Eslint, without this: { props } make a problem.
Button.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
