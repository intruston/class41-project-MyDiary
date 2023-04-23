import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./friendsOnline.css";
import profileIcon from "../assets/profile-icon.png";
import Loading from "./Loading";
import { UserContext } from "../hooks/useUserContext";

const FriendsOnline = () => {
  const [friendsOnline, setFriendsOnline] = useState([]);
  const { user } = useContext(UserContext);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/friends/online/${user._id}`,
    (response) => {
      setFriendsOnline(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  return (
    <>
      <h3>Online Friends</h3>
      <div className="rightbarFollowings">
        {friendsOnline.map((friend) => {
          return (
            <div key={friend._id} className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture ? friend.profilePicture : profileIcon
                }
                alt="friend avatar"
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{`${friend.firstName} ${friend.lastName}`}</span>
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

export default FriendsOnline;
