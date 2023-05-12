import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfilePicture from "./ProfilePicture";

const SingleFriend = ({ mappedFriend }) => {
  return (
    <div className="friends-page-item-container">
      <Link
        key={mappedFriend._id}
        to={`/user/${mappedFriend._id}`}
        className="friends-page-item"
      >
        <div>
          <ProfilePicture profilePicture={mappedFriend.profilePicture} />
        </div>
        <div className="friend-details">
          <div className="friend-name">
            <h3>
              {mappedFriend.firstName} {mappedFriend.lastName}
            </h3>
          </div>
          <div className="friend-bio">
            <span>{mappedFriend.bio}</span>
          </div>
        </div>
      </Link>
      <div className="dots-container">
        <span className="dots">•••</span>
      </div>
    </div>
  );
};

SingleFriend.propTypes = {
  mappedFriend: PropTypes.object.isRequired,
};

const FriendsPageList = ({ friends }) => {
  return (
    <div className="friends-page">
      {friends &&
        friends.map((mappedFriend) => (
          <SingleFriend key={mappedFriend._id} mappedFriend={mappedFriend} />
        ))}
    </div>
  );
};

FriendsPageList.propTypes = {
  friends: PropTypes.array.isRequired,
};

export default FriendsPageList;
