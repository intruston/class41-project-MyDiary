import React, { useEffect, useState, useRef } from "react";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import PostReaction from "./PostReaction";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import "./SinglePost.css";
import { useUserContext } from "../hooks/useUserContext";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost }) => {
  const { user } = useUserContext();
  const [likes, setLikes] = useState(mappedPost.likes);
  const isLikedByUser = likes.includes(user._id);
  const { anotherUser } = useGetAnotherUser({
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

  //Date in search
  const PostDate = ({ date }) => {
    const newDate = new Date(date);
    const options = { month: "long", day: "numeric" };
    const formattedDate = newDate.toLocaleDateString("en-US", options);

    return (
      <div className="post-date">
        <h3>{formattedDate}</h3>
      </div>
    );
  };

  PostDate.propTypes = {
    date: PropTypes.string.isRequired,
  };

  //Limit text inside result in 140 symbols. Otherwise ...Show more
  const MAX_CONTENT_LENGTH = 140;
  const [showMore, setShowMore] = useState(false);
  const content = showMore
    ? mappedPost.content
    : mappedPost.content.slice(0, MAX_CONTENT_LENGTH);

  return (
    <>
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
            <div className="date-inside">
              <PostDate date={mappedPost.createdAt} />
            </div>
          </div>
          <p className="text-inside">
            {content}
            {mappedPost.content.length > MAX_CONTENT_LENGTH && !showMore && (
              <span>
                ...{" "}
                <a
                  href="#"
                  className="show-link"
                  onClick={() => setShowMore(true)}
                >
                  Show more
                </a>
              </span>
            )}
          </p>
        </div>
        {error && <div className="error">{error.message}</div>}
      </div>
      {/* Post reactions */}
      <div className="post-tags-container">
        <p className="post-tags">
          {mappedPost.tags.map((tag) => (
            <span key={tag}>#{tag.toUpperCase()} </span>
          ))}
        </p>
        <PostReaction id={mappedPost._id} totalLikes={mappedPost.likes} />
      </div>
    </>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
