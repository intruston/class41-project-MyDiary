import React, { useEffect, useState, useRef } from "react";
import useGetAnotherUser from "../hooks/useGetAnotherUser";

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
  // const { auth } = useAuthContext();
  const { user } = useUserContext();
  // const date = new Date(mappedPost.createdAt);
  // const options = { month: "long", day: "numeric" };
  // const formattedDate = date.toLocaleDateString("en-US", options);
  const [likes, setLikes] = useState(mappedPost.likes);
  const isLikedByUser = likes.includes(user._id);
  const {
    // isLoading: anotherUserLoading,
    // error: anotherUserError,
    anotherUser,
  } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });
  const { error, isLoading, cancelFetch } = useFetch(
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

  // const likePost = () => {
  //   performFetch({
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${auth.token}`,
  //     },
  //     body: JSON.stringify({
  //       userId: user._id,
  //     }),
  //   });
  // };

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
