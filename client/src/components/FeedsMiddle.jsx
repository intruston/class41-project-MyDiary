import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../hooks/useUserContext";

const FeedsMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  //Handle Search
  const sanitizeTags = (value) => {
    let sanitizedValue = value.trim(); // Remove leading and trailing spaces
    sanitizedValue = sanitizedValue.replace(/^[#\s]+/, ""); // Remove '#' symbols and spaces from the beginning
    return sanitizedValue;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitizedTags = sanitizeTags(searchQuery);
    sanitizedTags
      ? navigate(`/search/tags/${sanitizedTags}`)
      : navigate("/search");
  };
  return (
    <div className="middle-section">
      <div className="middle-container ">
        {/* Page Header */}
        <div className="feed-header">
          <div className="left">
            <h2>Feed</h2>
          </div>
          <div className="right">
            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="feed-search-form">
              <input
                type="text"
                placeholder="Search posts"
                minLength={2}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="feed-search-input"
              />
              <button type="submit" className="feed-search-button">
                <SearchIcon className="feed-search-icon" />
              </button>
            </form>
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
