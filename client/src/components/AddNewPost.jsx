import React, { useState } from "react";
import "./AddNewPost.css";
import "../components/Button";
import postBackground from "../assets/post-background.png";
import Button from "../components/Button";
import NewPostModal from "../components/NewPostModal";
// import PropTypes from "prop-types";

const AddNewPost = () => {
  const [visible, setVisible] = useState(false);
  const buttonFunction = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <div className="add-new-post">
      {visible && <NewPostModal closeModal={closeModal} />}
      <img src={postBackground} alt="user background" />
      <div className="post-button">
        <Button buttonFunction={buttonFunction} buttonContent={"+ Add Post"} />
      </div>
    </div>
  );
};

// Input.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default AddNewPost;
