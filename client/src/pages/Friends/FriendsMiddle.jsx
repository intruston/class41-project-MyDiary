import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../hooks/useUserContext";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import FriendsPageHeader from "./FriendsPageHeader";
import FriendsList from "./FriendsList";

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
        <FriendsList friends={friendsList} />
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

export default FriendsMiddle;
