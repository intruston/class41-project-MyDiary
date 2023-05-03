import React from "react";
import PropTypes from "prop-types";

const BanPost = ({ postId }) => {
  postId = ".";
  return <a>Ban Post{postId}</a>;
};

BanPost.propTypes = {
  postId: PropTypes.string,
};

export default BanPost;
