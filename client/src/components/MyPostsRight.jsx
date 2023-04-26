import React from "react";

import FriendsList from "./FriendsList";
const MyPostsRight = () => {
  return (
    <div className="right-section">
      <div className="triple-container">
        <div className="top-div has-loading">This will be Calendar</div>
        <div className="middle-div">
          <FriendsList />
        </div>
        <div className="bottom-div has-loading">This will be popular tags</div>
      </div>
    </div>
  );
};

export default MyPostsRight;