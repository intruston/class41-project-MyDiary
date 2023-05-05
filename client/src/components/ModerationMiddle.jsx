import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const ModerationMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/moderation/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [posts]);

  const reportedPosts = posts.filter(
    (post) => post.isReported && !post.isBanned
  );
  const bannedPosts = posts.filter((post) => post.isBanned);

  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="moderation-header">
          <div className="left">
            <h2>To review</h2>
          </div>
        </div>
        <div>
          {reportedPosts === [] ? (
            <div className="no-banned-posts">No any reports now</div>
          ) : (
            reportedPosts.map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost
                  mappedPost={mappedPost}
                  refreshUsers={performFetch}
                />
              </div>
            ))
          )}
        </div>

        <div className="moderation-header">
          <div className="left">
            <h2>Banned</h2>
          </div>
        </div>
        <div>
          {bannedPosts === [] ? (
            <div className="no-banned-posts">No banned posts</div>
          ) : (
            bannedPosts.map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost
                  mappedPost={mappedPost}
                  refreshUsers={performFetch}
                />
              </div>
            ))
          )}
        </div>
        {error && <div className="error">{error.message}</div>}
      </div>
    </div>
  );
};

export default ModerationMiddle;
