import React, { useEffect, useState, useRef } from "react";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import { Link } from "react-router-dom";
import PostDate from "./PostDate";
import PostReaction from "./PostReaction";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import "./SinglePost.css";
import { useUserContext } from "../hooks/useUserContext";
// import { useAuthContext } from "../hooks/useAuthContext";

import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost }) => {
  const { user } = useUserContext();
  const [likes, setLikes] = useState(mappedPost.likes);
  const isLikedByUser = likes.includes(user._id);
  const {
    isLoading: anotherUserLoading,
    error: anotherUserError,
    anotherUser,
  } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });
  const { error, cancelFetch } = useFetch(
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

  //Limit text inside result in 140 symbols. Otherwise ...Show more
  const MAX_CONTENT_LENGTH = 140;
  const [showMore, setShowMore] = useState(false);
  const content = showMore
    ? mappedPost.content
    : mappedPost.content.slice(0, MAX_CONTENT_LENGTH);

  const handleShowMore = (event) => {
    event.preventDefault(); // Prevent the default scroll behavior
    setShowMore(true);
  };
  return (
    <div className="single-post-component">
      {/* Post */}
      <div className="pos-container">
        <div className="side-profile has-loading">
          <Link
            to={
              anotherUser?._id === user._id
                ? "/my-posts"
                : `/user/${anotherUser?._id}`
            }
          >
            {anotherUserLoading && <Loading />}
            <ProfilePicture
              profilePicture={anotherUser ? anotherUser.profilePicture : null}
              size={"small"}
            />
          </Link>
        </div>

        <div className="post-content">
          <div className="post-header">
            <Link
              to={
                anotherUser?._id === user._id
                  ? "/my-posts"
                  : `/user/${anotherUser?._id}`
              }
            >
              <h3>{anotherUser ? anotherUser.firstName : null}</h3>
            </Link>
            <div className="post-right-side">
              {/* Date */}
              <PostDate date={mappedPost.createdAt} />
              <h2>...</h2>
            </div>
          </div>

          <p className="post-context-text">
            {content}
            {mappedPost.content.length > MAX_CONTENT_LENGTH && !showMore && (
              <span>
                ...{" "}
                <a href="#" className="show-link" onClick={handleShowMore}>
                  Show more
                </a>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Post Bottom */}
      <div className="post-bottom">
        <p className="post-bottom-tags">
          {mappedPost.tags.map((tag) => (
            <span key={tag}>#{tag.toUpperCase()} </span>
          ))}
        </p>
        <PostReaction id={mappedPost._id} totalLikes={mappedPost.likes} />
      </div>

      {(error || anotherUserError) && (
        <div className="error">
          {error?.message} {anotherUserError?.message}
        </div>
      )}
    </div>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
