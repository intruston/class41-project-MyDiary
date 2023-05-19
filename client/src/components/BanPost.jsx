import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";

const BanPost = ({ post, refreshUsers }) => {
  const { user } = useUserContext();
  const [banState, setBanState] = useState(post.isBanned);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${post._id}`,
    (response) => {
      setBanState(response.isBanned);
      refreshUsers();
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    const updatedPost = {
      ...post,
      isBanned: banState ? false : true,
    };

    performFetch({
      method: "PUT",
      body: JSON.stringify(updatedPost),
    });
  };

  if (isLoading || !user.isModerator || user._id === post.userId) return null;

  return (
    <li>
      <span onClick={handleClick}>{banState ? "Unban post" : "Ban post"}</span>
      {error && <div className="error">{error.message || error}</div>}
    </li>
  );
};

BanPost.propTypes = {
  post: PropTypes.object,
  refreshUsers: PropTypes.func,
};

export default BanPost;
