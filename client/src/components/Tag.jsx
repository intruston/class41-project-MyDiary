import React from "react";
import PropTypes from "prop-types";

const Tag = ({ text }) => {
  return <p>{text}</p>;
};
Tag.propTypes = {
  text: PropTypes.string,
};
export default Tag;
