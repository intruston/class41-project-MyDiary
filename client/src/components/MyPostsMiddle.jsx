import React, { useState, useEffect, useContext } from "react";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";
import moment from "moment";
const MyPostsMiddle = ({ setActive }) => {
  const { auth } = useAuthContext();
  const { user, getUser } = useUserContext();
  const { date } = useContext(useDateContext);

  useEffect(() => {
    getUser(auth.id, auth.token);
  }, []);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("public");
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${auth.id}`,
    (response) => {
      setPosts(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [posts]);

  const handleTabClick = (tab) => {
    performFetch();
    setActiveTab(tab);
  };

  let publicCount = 0;
  let privateCount = 0;
  const filteredPosts =
    posts &&
    posts.filter((mappedPost) => {
      const postDate = moment(mappedPost.createdAt).format("YYYY-MM-DD");
      if (date) {
        if (mappedPost.isPrivate && postDate === date) {
          privateCount++;
          return true;
        }
        if (!mappedPost.isPrivate && postDate === date) {
          publicCount++;
          return true;
        }
      } else {
        if (mappedPost.isPrivate) {
          privateCount++;
          return true;
        } else {
          if (!mappedPost.isPrivate) {
            publicCount++;
            return true;
          }
        }
      }
      return false;
    });
  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="left">
            <h2>My Diary</h2>
            <h4>
              You have{" "}
              <strong>
                {(publicCount || privateCount) && publicCount + privateCount}
              </strong>{" "}
              {publicCount + privateCount > 1 ? "posts" : "post"}
              {date && " at " + date}
            </h4>
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
            {publicCount > 1 ? "Public posts " : "Public post "}
            {publicCount}
          </h4>
          <h4
            className={activeTab === "private" ? "active-posts" : ""}
            onClick={() => handleTabClick("private")}
          >
            {privateCount > 1 ? "Private posts " : "Private post "}
            {privateCount}
          </h4>
        </div>
        <div>
          {filteredPosts && (
            <>
              {filteredPosts
                .filter((myPost) => {
                  if (activeTab === "private") {
                    return myPost.isPrivate;
                  } else {
                    return !myPost.isPrivate;
                  }
                })
                .map((mappedPost) => (
                  <div className="single-post has-loading" key={mappedPost._id}>
                    {isLoading && <Loading />}
                    <SinglePost mappedPost={mappedPost} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

MyPostsMiddle.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default MyPostsMiddle;
