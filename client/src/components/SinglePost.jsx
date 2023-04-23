import React, { useContext } from "react";
import profileIcon from "../assets/profile-icon.png";
import "./SinglePost.css";
import { UserContext } from "../hooks/useUserContext";

import PropTypes from "prop-types";

const SinglePost = ({ mappedPost }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="post-date">
        <hr />
        <h3>Date</h3>
        <hr />
      </div>
      <div className="pos-container">
        <div className="post-profile-img">
          <img src={profileIcon} alt="profile picture" />
        </div>
        <div className="post-content">
          <div className="post-header">
            <h3>{user.firstName}</h3>
            <h2>...</h2>
          </div>
          <p>{mappedPost.content}</p>
        </div>
      </div>
    </>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
