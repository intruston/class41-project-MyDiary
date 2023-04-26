import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./friendsList.css";
import profileIcon from "../assets/profile-icon.png";
import Loading from "./Loading";
import { UserContext } from "../hooks/useUserContext";

const FriendsList = () => {
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
    <>
      <h3>Friends</h3>
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
    </>
  );
};

export default FriendsList;