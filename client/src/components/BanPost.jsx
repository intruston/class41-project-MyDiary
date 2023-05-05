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
      if (response.success) {
        setBanState(response.isBanned);
        refreshUsers();
      } else {
        alert(response.msg);
      }
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

  if (error) {
    alert(error);
  }

  return (
    <span onClick={handleClick}>{banState ? "Unban post" : "Ban post"}</span>
  );
};

BanPost.propTypes = {
  post: PropTypes.object,
  refreshUsers: PropTypes.func,
};

export default BanPost;
