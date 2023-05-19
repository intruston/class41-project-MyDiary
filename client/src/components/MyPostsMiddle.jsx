import React, { useState, useEffect, useContext } from "react";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";
import Modal from "./Modal";
import AddNewPost from "./AddNewPost";
import moment from "moment";
import noImage from "../assets/no-image.png";
const MyPostsMiddle = () => {
  const { user } = useUserContext();
  const { date } = useContext(useDateContext);

  const [modalActive, setModalActive] = useState(false);
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //Public-Private Counts
  let publicCount = 0;
  let privateCount = 0;
  const filteredPosts =
    posts &&
    posts.filter((mappedPost) => {
      const postDate = moment(mappedPost.createdAt).format("YYYY-MM-DD");
      const isPostOnDate = !date || postDate === date;
      const isPrivate = mappedPost.isPrivate;

      if (isPostOnDate) {
        if (isPrivate) {
          privateCount++;
        } else {
          publicCount++;
        }
        return true;
      }

      return false;
    });

  return (
    <div className="middle-section">
      <Modal active={modalActive} setActive={setModalActive}>
        <AddNewPost setActive={setModalActive} refreshUsers={performFetch} />
      </Modal>
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
        <div className="add-new-post has-loading">
          <img
            src={postBackground}
            alt="user background"
            onError={(e) => (e.target.src = noImage)}
          />
          <div className="post-button">
            <button onClick={() => setModalActive(true)}>+ Add Post</button>
          </div>
        </div>
        {error && (
          <div className="error">
            {typeof error === "string"
              ? error
              : "Error happened. Refresh the page"}
          </div>
        )}

        {/* Public - Private */}
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

      {/* POSTS */}
      {isLoading && (
        <div className="load-container">
          .
          <Loading />
        </div>
      )}
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
                  <SinglePost
                    mappedPost={mappedPost}
                    refreshUsers={performFetch}
                  />
                </div>
              ))}
          </>
        ) : (
          !isLoading && (
            <div className="no-post has-loading">Lets start writing</div>
          )
        )}
      </div>
    </div>
  );
};

export default MyPostsMiddle;
