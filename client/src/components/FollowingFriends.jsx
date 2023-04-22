import React from "react";
import "./followingFriends.css";
import profileIcon from "../assets/profile-icon.png";

const FollowingFriends = () => {
  //useContext
  //fetch the following friends

  return (
    <>
      <h3>Following Friends</h3>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img
            src={profileIcon}
            alt="friend avatar"
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">John Doe</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={profileIcon}
            alt="friend avatar"
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Karin Jefferson</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={profileIcon}
            alt="friend avatar"
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Nick Carter jr.</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={profileIcon}
            alt="friend avatar"
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Douglas Bishop</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={profileIcon}
            alt="friend avatar"
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">John Doe</span>
        </div>
      </div>
    </>
  );
};

export default FollowingFriends;
