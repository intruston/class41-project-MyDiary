import React from "react";
import "./PageHeader.css";
import PropTypes from "prop-types";

const PageHeader = ({ postCount }) => {
  return (
    <div className="page-header">
      <div className="left">
        <h2>My Diary</h2>
        <h4>
          <strong>{postCount}</strong> Post
        </h4>
      </div>
      <div className="right">
        <h3>The only way to do great work is to love what you do.</h3>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  postCount: PropTypes.number.isRequired,
};

export default PageHeader;
