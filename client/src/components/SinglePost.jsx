import React, { useState } from "react";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import { Link } from "react-router-dom";
import PostDate from "./PostDate";
import PostReaction from "./PostReaction";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import "./SinglePost.css";
import { useUserContext } from "../hooks/useUserContext";

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
    event.preventDefault();
    setShowMore(true);
  };
  const profileLink =
    anotherUser?._id === user._id ? "/my-posts" : `/user/${anotherUser?._id}`;
  return (
    <div className="single-post-component">
      <div className="pos-container">
        {/* Profile Picture */}
        <div className="side-profile has-loading">
          <Link to={profileLink}>
            {isLoading && <Loading />}
            <ProfilePicture
              profilePicture={anotherUser ? anotherUser.profilePicture : null}
              size={"small"}
            />
          </Link>
        </div>

        {/* Post */}
        <div className="post-content">
          <div className="post-header">
            <Link to={profileLink}>
              <h3>{anotherUser ? anotherUser.firstName : null}</h3>
            </Link>
            <div className="post-right-side">
              {/* Date */}
              <PostDate date={mappedPost.createdAt} />
              <h2>...</h2>
            </div>
          </div>

          {/* Post Content */}
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
            <span key={tag}>#{tag.toUpperCase()}&nbsp;</span>
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
