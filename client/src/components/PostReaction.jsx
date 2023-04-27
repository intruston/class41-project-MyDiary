import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const PostReaction = ({ id, totalLikes }) => {
  //Checking for likes
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState(totalLikes);
  const isLikedByUser = likes.includes(user._id);
  const heartIconRef = useRef(null);

  //Fetch for likes
  const { error, performFetch, cancelFetch } = useFetch(
    `/post/${id}/like`,
    (response) => {
      setLikes(response.result);
      if (heartIconRef.current) {
        isLikedByUser
          ? heartIconRef.current.classList.remove("is-animating")
          : heartIconRef.current.classList.add("is-animating");
      }
    }
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  const likePost = () => {
    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
  };

  return (
    <div className="post-reaction" onClick={likePost}>
      <div
        style={{ backgroundImage: "url(/heart-animation.png)" }}
        className={`heart-icon ${isLikedByUser ? "pink" : "grey"}`}
        ref={heartIconRef}
      ></div>
      <div className="likes">{likes.length}</div>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

PostReaction.propTypes = {
  id: PropTypes.string.isRequired,
  totalLikes: PropTypes.string.isRequired,
};

export default PostReaction;
