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
      {/* Page Header */}
      <div className="moderation-header">
        <h2>To review</h2>
        <p>
          These posts have been reported by users. They will still be visible to
          other users.
        </p>
        <p>You can remove the report or ban the posts.</p>
      </div>
      <div>
        {reportedPosts === [] ? (
          <div className="no-banned-posts">No any reports now</div>
        ) : (
          reportedPosts.map((mappedPost) => (
            <div className="single-post has-loading" key={mappedPost._id}>
              {isLoading && <Loading />}
              <SinglePost mappedPost={mappedPost} refreshUsers={performFetch} />
            </div>
          ))
        )}
      </div>
      <hr className="moderation-hr" />
      <div className="moderation-header banned">
        <h2>Banned</h2>
        <p>These posts are banned by moderation. Users can&apos;t see them</p>
        <p>You can remove the ban from posts.</p>
      </div>

      <div>
        {bannedPosts === [] ? (
          <div className="no-banned-posts">No banned posts</div>
        ) : (
          bannedPosts.map((mappedPost) => (
            <div className="single-post has-loading" key={mappedPost._id}>
              {isLoading && <Loading />}
              <SinglePost mappedPost={mappedPost} refreshUsers={performFetch} />
            </div>
          ))
        )}
      </div>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default ModerationMiddle;
