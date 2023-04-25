import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProfilePicture from "./ProfilePicture";
import Loading from "./Loading";
import { icons } from "../assets/svg.js";
import "./SinglePost.css";
import { UserContext } from "../hooks/useUserContext";

import PropTypes from "prop-types";

const SinglePost = ({ mappedPost }) => {
  const { user } = useContext(UserContext);
  const date = new Date(mappedPost.createdAt);
  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [likes, setLikes] = useState(mappedPost.likes.length);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${mappedPost._id}/like`,
    (response) => {
      setLikes(response.result.length);
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
    <>
      <div className="post-date">
        <hr />
        <h3>{formattedDate}</h3>
        <hr />
      </div>
      <div className="pos-container">
        <div className="side-profile">
          <ProfilePicture
            profilePicture={user.profilePicture}
            size={"small"}
            border={"circle"}
          />
        </div>
        <div className="post-content">
          <div className="post-header">
            <div className="inside-profile">
              <ProfilePicture
                profilePicture={user.profilePicture}
                size={"smaller"}
                border={"circle"}
              />
              <h3>{user.firstName}</h3>
            </div>

            <h2>...</h2>
          </div>
          <p>{mappedPost.content}</p>
        </div>
      </div>
      <div className="post-reaction" onClick={likePost}>
        <div className="has-loading">
          {icons.hearth} {isLoading && <Loading />}
        </div>
        {likes}
      </div>
      {error && <div className="error">{error.message}</div>}
    </>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
