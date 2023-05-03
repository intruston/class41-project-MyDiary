import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./friendsList.css";
import profileIcon from "../assets/profile-icon.png";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const FriendsList = () => {
  const { user } = useUserContext();

  const [friendsList, setFriendsList] = useState([]);

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
    <div className="friend-list-wrapper has-loading">
      <span className="friend-list-header">Friends</span>
      <div className="friend-list">
        {friendsList.map((friend) => {
          return (
            <div key={friend._id}>
              <Link to={`/user/${friend._id}`}>
                <div className="friend-list-item">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : profileIcon
                    }
                    alt="friend avatar"
                    className="friend-list-avatar"
                  />
                  <div className="friend-list-name">
                    <span>{`${friend.firstName} ${friend.lastName}`}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <br />
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FriendsList;
