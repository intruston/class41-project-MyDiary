import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../hooks/useUserContext";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";

import PropTypes from "prop-types";

const FriendsPageHeader = ({ friendCount }) => {
  return (
    <div className="page-header">
      <div className="left">
        <h2>Friends</h2>
        <h4>
          <strong>{friendCount}</strong> Friends
        </h4>
      </div>
      <div>
        <label>
          <input type="checkbox" />
          Show online
        </label>
        <form>
          <div className="search-wrapper">
            <input type="text" id="search-input" placeholder="Find my friend" />
          </div>
        </form>
      </div>
    </div>
  );
};

FriendsPageHeader.propTypes = {
  friendCount: PropTypes.number,
};

const SingleFriend = ({ mappedFriend }) => {
  return (
    <>
      <div className="friend-container" key={mappedFriend._id}>
        <div className="friend-profile-img">
          <img src={mappedFriend.profilePicture} alt="friend profile picture" />
        </div>
        <div className="friend-content">
          <div className="friend-header">
            <h3>
              {mappedFriend.firstName} {mappedFriend.lastName}
            </h3>
            <h2>...</h2>
            <p>{mappedFriend.bio && mappedFriend.bio}</p>
          </div>
          <p>{mappedFriend.content}</p>
        </div>
      </div>
    </>
  );
};

const Friends = ({ friends }) => {
  return (
    <div>
      {friends &&
        friends.map((mappedFriend) => (
          <SingleFriend key={mappedFriend._id} mappedFriend={mappedFriend} />
        ))}
    </div>
  );
};

Friends.propTypes = {
  friends: PropTypes.array.isRequired,
};

const FriendsMiddle = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { user } = useContext(UserContext);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/friends/${user._id}`,
    (response) => {
      setFriendsList(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  return (
    <div className="middle-section">
      <div className="middle-container">
        <FriendsPageHeader friendCount={friendsList && friendsList.length} />
        <Friends friends={friendsList} />
        {isLoading && <Loading />}
        {error && (
          <div className="error">
            {error.toString()}
            {user}
          </div>
        )}
      </div>
    </div>
  );
};

SingleFriend.propTypes = {
  mappedFriend: PropTypes.object.isRequired,
};

export default FriendsMiddle;
