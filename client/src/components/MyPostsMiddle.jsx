import React, { useState, useEffect, useContext } from "react";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";

const MyPostsMiddle = ({ setActive }) => {
  const { user } = useUserContext();
  const { date } = useContext(useDateContext);

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("public");
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

  useEffect(() => {
    return cancelFetch;
  }, [posts]);

  const handleTabClick = (tab) => {
    performFetch();
    setActiveTab(tab);
  };
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
            <span>here is selected date: {date}</span>
          </div>
          <div className="right">
            <h3>{user ? user.bio : ""}</h3>
          </div>
        </div>

        {/* Add New Post */}
        <div className="add-new-post">
          <img src={postBackground} alt="user background" />
          <div className="post-button">
            <button onClick={() => setActive(true)}>+ Add Post</button>
          </div>
        </div>
        {error && <div className="error">{error.message}</div>}

        {/* Posts */}
        <div className="public-private">
          <h4
            className={activeTab === "public" ? "active-posts" : ""}
            onClick={() => handleTabClick("public")}
          >
            Public Posts
          </h4>
          <h4
            className={activeTab === "private" ? "active-posts" : ""}
            onClick={() => handleTabClick("private")}
          >
            Private Posts
          </h4>
        </div>
        <div>
          {posts &&
            posts
              .filter((mappedPost) => {
                if (activeTab === "private") {
                  return mappedPost.isPrivate;
                } else {
                  return !mappedPost.isPrivate;
                }
              })
              .map((mappedPost) => (
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
