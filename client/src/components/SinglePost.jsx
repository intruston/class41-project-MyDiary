import React from "react";
import PropTypes from "prop-types";
import useGetAnotherUser from "../hooks/useGetAnotherUser";

import PostDate from "./PostDate";
import PostReaction from "./PostReaction";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import "./SinglePost.css";

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost }) => {
  //Taking User information from post
  const { isLoading, error, anotherUser } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });

  return (
    <>
      {/* Date */}
      <PostDate date={mappedPost.createdAt} />

      {/* Post */}
      <div className="pos-container">
        <div className="side-profile has-loading">
          {isLoading && <Loading />}
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
          {error && <div className="error">{error.message}</div>}
        </div>
      </div>

      {/* Post reactions */}
      <PostReaction id={mappedPost._id} totalLikes={mappedPost.likes} />
    </>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
