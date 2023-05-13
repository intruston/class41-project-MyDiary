import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import { usePostsContext } from "../hooks/usePostsContext";

const BanPost = ({ post }) => {
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const [banState, setBanState] = useState(post.isBanned);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${post._id}`,
    (response) => {
      if (response.success) {
        setPosts(
          posts.map((p) => {
            if (p._id === post._id) {
              return response.result;
            } else {
              return p;
            }
          })
        );
        setBanState(response.result.isBanned);
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
    <li>
      <span onClick={handleClick}>{banState ? "Unban post" : "Ban post"}</span>
    </li>
  );
};

BanPost.propTypes = {
  post: PropTypes.object,
};

export default BanPost;
