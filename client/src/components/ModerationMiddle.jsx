import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const ModerationMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const [bannedPosts, setBannedPosts] = useState([]);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/moderation/${user._id}`,
    (response) => {
      setBannedPosts(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [bannedPosts]);

  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="moderation-header">
          <div className="left">
            <h2>Banned</h2>
          </div>
        </div>
        {error && <div className="error">{error.message}</div>}

        {/* Posts */}
        <div>
          {bannedPosts === [] ? (
            <div className="no-banned-posts">No banned posts</div>
          ) : (
            bannedPosts.map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost mappedPost={mappedPost} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModerationMiddle;
