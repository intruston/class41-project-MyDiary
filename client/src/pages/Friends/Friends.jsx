import React from "react";
import Navbar from "../../components/Navbar";
import FriendsMiddle from "../../components/FriendsMiddle";
import FriendsRight from "../../components/FriendsRight";
import "./Friends.css";
const Friends = () => {
  return (
    <div className="page-container">
      <Navbar active={"Friends"} />
      <FriendsMiddle />
      <FriendsRight />
    </div>
  );
};

export default Friends;
