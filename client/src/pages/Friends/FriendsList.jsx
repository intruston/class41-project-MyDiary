import React from "react";
import profileIcon from "../../assets/profile-icon.png";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const SingleFriend = ({ mappedFriend }) => {
  return (
    <Link
      key={mappedFriend._id}
      to={`/user/${mappedFriend._id}`}
      className="friend-page-item"
    >
      <img
        src={
          mappedFriend.profilePicture
            ? mappedFriend.profilePicture
            : profileIcon
        }
        alt="friend avatar"
        className="friend-page-avatar"
      />
      <div className="friend-page-details">
        <div className="dots-container">
          <h2 className="dots">...</h2>
        </div>
        <div className="friend-page-name">
          <h3>
            {mappedFriend.firstName} {mappedFriend.lastName}
          </h3>
        </div>

        <div className="friend-page-bio">
          <span>{mappedFriend.bio ? mappedFriend.bio : "no bio"}</span>
        </div>
      </div>
    </Link>
  );
};

SingleFriend.propTypes = {
  mappedFriend: PropTypes.object.isRequired,
};

const FriendsList = ({ friends }) => {
  return (
    <div className="friend-page">
      {friends &&
        friends.map((mappedFriend) => (
          <SingleFriend key={mappedFriend._id} mappedFriend={mappedFriend} />
        ))}
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.array.isRequired,
};

export default FriendsList;
