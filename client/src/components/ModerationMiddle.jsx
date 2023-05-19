import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const ModerationMiddle = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("review");

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

  const getPosts =
    activeTab === "review"
      ? posts.filter((post) => post.isReported && !post.isBanned)
      : posts.filter((post) => post.isBanned);

  return (
    <div className="middle-section">
      <div className="moderation-header">
        <div className="headers-switch">
          <h2
            onClick={() => setActiveTab("review")}
            className={activeTab === "review" ? "active-tab" : ""}
          >
            To review
          </h2>
          <h2
            onClick={() => setActiveTab("banned")}
            className={activeTab === "banned" ? "active-tab" : ""}
          >
            Banned
          </h2>
        </div>

        {activeTab === "review" && (
          <p>
            These posts have been reported by users. They will still be visible
            to other users. <br />
            You can remove the report or ban the posts.
          </p>
        )}
        {activeTab === "banned" && (
          <p>
            These posts are banned by moderation. Users can&apos;t see them.
            <br /> You can remove the ban from posts.
          </p>
        )}
      </div>

      <div>
        {getPosts === [] ? (
          <div className="no-banned-posts">No any reports now</div>
        ) : (
          getPosts.map((mappedPost) => (
            <div className="single-post has-loading" key={mappedPost._id}>
              <SinglePost mappedPost={mappedPost} refreshUsers={performFetch} />
            </div>
          ))
        )}
      </div>

      {isLoading && <Loading />}
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
    </div>
  );
};

export default ModerationMiddle;
