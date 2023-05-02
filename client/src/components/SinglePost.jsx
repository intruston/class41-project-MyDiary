import React, { useState } from "react";
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

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost }) => {
  const { user } = useUserContext();

  const { isLoading, error, anotherUser } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });

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
            {isLoading && <Loading />}
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

      {error && <div className="error">{error?.message}</div>}
    </div>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
