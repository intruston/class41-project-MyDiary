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
        <FriendsPageList friends={friendsList} />
        {isLoading && <Loading />}
        {error && (
          <div className="error">
            {error.toString()}
            {user}
          </div>
        )}
      </div>
      <div className="middle-container friends-second">
        <div className="page-header friends-page-header">
          <div>
            <h3>+ Friends to follow</h3>
            {searchData.length > 0 ? (
              <h4>
                <strong>{searchData.length}</strong> Found
              </h4>
            ) : (
              <h4>
                You can find friends by filling the search form
                <strong> →</strong>
              </h4>
            )}
          </div>
        </div>
        {hasSearchData && <FriendsPageList friends={searchData} />}
      </div>
    </div>
  );
};

FriendsMiddle.propTypes = {
  searchData: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};

export default FriendsMiddle;
