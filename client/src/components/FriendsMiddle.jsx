import React, { useState, useEffect, useMemo } from "react";
import Loading from "./Loading";
import useFetch from "../hooks/useFetch";
import FriendsPageHeader from "./FriendsPageHeader";
import FriendsPageList from "./FriendsPageList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";
import PropTypes from "prop-types";

const FriendsMiddle = ({ searchData }) => {
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

  //check if searchData has some users to show
  const hasSearchData = useMemo(
    () => searchData[0] && searchData[0]._id,
    [searchData]
  );

  return (
    <div className="middle-section">
      <div className="middle-container">
        <FriendsPageHeader friendCount={friendsList && friendsList.length} />
        <FriendsPageList friends={friendsList} refreshUser={performFetch} />
        {isLoading && <Loading />}
        {error && (
          <div className="error">
            {error.toString()}
            {user}
          </div>
        )}
      </div>
      {/* Display 'You can find friends...' or 'No users found' or search results */}
      <h3
        className="friends-search-results"
        style={{
          display: searchData && searchData.length > 0 ? "none" : "block",
        }}
      >
        {searchData && searchData.length === 0
          ? "No users found"
          : "You can find friends by filling the search form →"}
      </h3>
      {error && <div className="error">{error.message}</div>}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div
        className="middle-container friends-second"
        style={{
          display: searchData.length > 0 ? "block" : "none",
        }}
      >
        <div className="page-header friends-page-header">
          <div>
            <h3>+ Friends to follow</h3>
            <h4>
              <strong>{searchData.length}</strong> Found
            </h4>
          </div>
        </div>
        {hasSearchData && (
          <FriendsPageList friends={searchData} refreshUser={performFetch} />
        )}
      </div>
    </div>
  );
};

FriendsMiddle.propTypes = {
  searchData: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};

export default FriendsMiddle;
