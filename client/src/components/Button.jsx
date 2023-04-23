import React from "react";
import PropTypes from "prop-types";

const Button = ({ buttonFunction, buttonContent }) => {
  return (
    <button className="orange-button" onClick={buttonFunction}>
      {buttonContent}
    </button>
  );
};
// This required for Eslint, without this: { props } make a problem.
Button.propTypes = {
  buttonFunction: PropTypes.element.isRequired,
  buttonContent: PropTypes.string.isRequired,
};

export default Button;
