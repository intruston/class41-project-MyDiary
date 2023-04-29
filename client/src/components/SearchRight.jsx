import React from "react";
import FriendsList from "./FriendsList";

const SearchRight = () => {
  return (
    <div className="right-section">
      <div className="double-container">
        <div className="top-div">
          <div className="tags-inside">This will be popular tags</div>
        </div>
        <div className="bottom-div">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default SearchRight;
