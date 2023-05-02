import React from "react";
import Navbar from "../../components/Navbar";
import FriendsMiddle from "./FriendsMiddle";
import FriendsRight from "./FriendsRight";
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
