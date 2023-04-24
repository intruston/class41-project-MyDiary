import React, { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import PropTypes from "prop-types";

import { UserContext } from "../hooks/useUserContext";

const MyPostsMiddle = ({ setActive }) => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [posts]);

  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="left">
            <h2>My Diary</h2>
            <h4>
              <strong>{posts && posts.length}</strong> Post
            </h4>
          </div>
          <div className="right">
            <h3>{user.bio}</h3>
          </div>
        </div>

        {/* Add New Post */}
        <div className="add-new-post">
          <img src={postBackground} alt="user background" />
          <div className="post-button">
            <Button
              onClick={() => setActive(true)}
              content={"+ Add Post"}
              color={"orange"}
            />
          </div>
        </div>
        {error && <div className="error">{error.message}</div>}

        {/* Posts */}
        <div className="public-private">
          <h3>Public Posts</h3>
          <h3>Private Posts</h3>
        </div>
        <div>
          {posts &&
            posts.map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost mappedPost={mappedPost} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

MyPostsMiddle.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default MyPostsMiddle;
