import React, { useState, useEffect, useRef, useCallback } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../hooks/useUserContext";
import { usePostsContext } from "../hooks/usePostsContext";
import { sanitizeTags } from "../util/sanitizeTags";

const FeedsMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/feed/${user._id}?limit=10&page=${currentPage}`,
    (response) => {
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  // function updateAndFilterPosts(posts, postsNew) {
  //   const updatedPosts = postsNew.reduce(
  //     (acc, post) => {
  //       const existingPostIndex = acc.findIndex((p) => p._id === post._id);
  //       if (existingPostIndex !== -1) {
  //         acc[existingPostIndex] = post;
  //       } else {
  //         acc.push(post);
  //       }
  //       return acc;
  //     },
  //     [...posts]
  //   );

  //   const filteredPosts = updatedPosts.filter((post) => {
  //     return !post.isPrivate && !post.isBanned;
  //   });

  //   return filteredPosts;
  // }

  // if we want banned post disappears at the same moment as ban pushed
  const filteredPosts = posts.filter((post) => {
    return !post.isPrivate && !post.isBanned;
  });

  // console.log(posts);

  // using Intersection Observer for fetching new posts when we see the last post on the page
  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [currentPage]);

  useEffect(() => {
    setPosts([]);
    return cancelFetch;
  }, []);

  //Handle Search
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
        {error && <div className="error">{error.message || error}</div>}
      </div>
      {/* Posts */}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {filteredPosts.length > 0
          ? filteredPosts.map((post, i) => (
              <div
                className="single-post has-loading"
                ref={filteredPosts.length === i + 1 ? lastPostRef : null}
                key={post._id}
              >
                <SinglePost mappedPost={post} refreshUsers={performFetch} />
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
