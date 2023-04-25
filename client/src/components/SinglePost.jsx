import React, { useContext, useEffect, useState, useRef } from "react";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import useFetch from "../hooks/useFetch";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import "./SinglePost.css";
import { UserContext } from "../hooks/useUserContext";

import PropTypes from "prop-types";

const SinglePost = ({ mappedPost }) => {
  const { user } = useContext(UserContext);
  const date = new Date(mappedPost.createdAt);
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [likes, setLikes] = useState(mappedPost.likes);
  const isLikedByUser = likes.includes(user._id);
  const {
    isLoading: anotherUserLoading,
    error: anotherUserError,
    anotherUser,
  } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });
  const { error, performFetch, cancelFetch } = useFetch(
    `/post/${mappedPost._id}/like`,
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

  const heartIconRef = useRef(null);

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
    <>
      <div className="post-date">
        <hr />
        <h3>{formattedDate}</h3>
        <hr />
      </div>
      <div className="pos-container">
        <div className="side-profile has-loading">
          {anotherUserLoading && <Loading />}
          <ProfilePicture
            profilePicture={anotherUser ? anotherUser.profilePicture : null}
            size={"small"}
          />
        </div>
        <div className="post-content">
          <div className="post-header">
            <div className="inside-profile">
              <ProfilePicture
                profilePicture={anotherUser ? anotherUser.profilePicture : null}
                size={"smaller"}
              />
              <h3>{anotherUser ? anotherUser.firstName : null}</h3>
            </div>

            <h2>...</h2>
          </div>
          <p>{mappedPost.content}</p>
        </div>
      </div>
      <div className="post-reaction" onClick={likePost}>
        <div
          style={{ backgroundImage: "url(/heart-animation.png)" }}
          className={`heart-icon ${isLikedByUser ? "pink" : "grey"}`}
          ref={heartIconRef}
        ></div>
        <div className="likes">{likes.length}</div>
      </div>
      {(error || anotherUserError) && (
        <div className="error">
          {error.message}||{anotherUserError.message}{" "}
        </div>
      )}
    </>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
