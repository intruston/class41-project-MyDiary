import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const FeedsMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/feed/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  // useEffect(() => {
  //   return cancelFetch;
  // }, []);

  const feedPosts = posts.filter((post) => {
    return !post.isPrivate && !post.isBanned;
  });

  return (
    <div className="middle-section">
      <div className="middle-container ">
        {/* Page Header */}
        <div className="feed-header">
          <div className="left">
            <h2>Feed</h2>
          </div>
          <div className="right">
            <h3>Search</h3>
          </div>
        </div>
        {error && <div className="error">{error.message}</div>}
      </div>
      {/* Posts */}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {feedPosts.length > 0
          ? feedPosts.map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                <SinglePost
                  mappedPost={mappedPost}
                  refreshUsers={performFetch}
                />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">No post to show in your feed</div>
            )}
      </div>
    </div>
  );
};

export default FeedsMiddle;
