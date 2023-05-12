import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useFetch from "../hooks/useFetch";
import { useUserContext } from "../hooks/useUserContext";

const FollowUnfollowButton = ({ anotherUserId, refreshUser }) => {
  const { user, dispatch } = useUserContext();
  const [disableButton, setDisableButton] = useState(false);
  const [following, setFollowing] = useState(
    user?.following?.includes(anotherUserId)
  );

  const {
    isLoading: isFollowLoading,
    error: followError,
    performFetch: followFetch,
    cancelFetch: followCancel,
  } = useFetch(`/user/${anotherUserId}/follow`, (response) => {
    dispatch({ type: "FOLLOWINGS", payload: { following: response.result } });
    setFollowing(!following);
    setDisableButton(false);
    refreshUser();
  });

  useEffect(() => {
    return followCancel;
  }, []);

  const followClick = () => {
    setDisableButton(true);
    followFetch({
      method: "PUT",
      body: JSON.stringify({
        _id: user._id,
      }),
    });
  };

  const buttonText = following ? "Unfollow" : "Follow";

  return (
    <>
      <div
        className="follow-unfollow"
        onClick={followClick}
        disabled={disableButton}
      >
        {isFollowLoading ? "..." : buttonText}
      </div>

      {followError && (
        <div className="error">{followError.message || followError}</div>
      )}
    </>
  );
};

FollowUnfollowButton.propTypes = {
  anotherUserId: PropTypes.string.isRequired,
  refreshUser: PropTypes.func,
};

export default FollowUnfollowButton;
