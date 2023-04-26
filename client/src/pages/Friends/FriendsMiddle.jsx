import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import FriendsPageHeader from "./FriendsPageHeader";
import FriendsList from "./FriendsList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";

const FriendsMiddle = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { auth } = useAuthContext();
  const { user } = useUserContext();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/friends/${user._id}`,
    (response) => {
      setFriendsList(response.result);
    }
  );

  useEffect(() => {
    performFetch({
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
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
