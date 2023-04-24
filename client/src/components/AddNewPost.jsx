import React from "react";
import PropTypes from "prop-types";

const AddNewPost = ({ setActive }) => {
  return (
    <div className="add-new-post">
      <h1 onClick={() => setActive(false)}>Hi</h1>
    </div>
  );
};

AddNewPost.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default AddNewPost;
