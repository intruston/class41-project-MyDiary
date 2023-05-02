import React, { useState, useEffect, useContext } from "react";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";
import moment from "moment";
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
            Public: <span>{publicCount}</span>
          </h4>
          <h4
            className={activeTab === "private" ? "active-posts" : ""}
            onClick={() => handleTabClick("private")}
          >
            Private: <span>{privateCount}</span>
          </h4>
        </div>
      </div>
      <div>
        {filteredPosts.length > 0 ? (
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
        ) : (
          <div className="no-post">Lets start writing</div>
        )}
      </div>
    </div>
  );
};

MyPostsMiddle.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default MyPostsMiddle;
