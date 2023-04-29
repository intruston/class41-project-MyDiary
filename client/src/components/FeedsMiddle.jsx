import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useAuthContext } from "../hooks/useAuthContext";

const FeedsMiddle = () => {
  // Getting user information and logout function from context
  const { auth } = useAuthContext();
  const [posts, setPosts] = useState([]);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/feed/${auth.id}`,
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
        <div className="feed-header">
          <div className="left">
            <h2>Feed</h2>
          </div>
          <div className="right">
            <h3>Search</h3>
          </div>
        </div>
        {error && <div className="error">{error.message}</div>}

        {/* Posts */}
        <div>
          {posts &&
            posts
              .filter((mappedPost) => {
                return !mappedPost.isPrivate;
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

export default FeedsMiddle;
