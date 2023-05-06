import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";

const MostLikedPosts = () => {
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

  const bestPosts = posts
    .filter((post) => {
      return !post.isPrivate && !post.isBanned;
    })
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 10);

  return (
    <>
      <h3 className="most-liked">
        Take a look on our most trending posts or try another search
      </h3>
      {error && <div className="error">{error.message}</div>}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {bestPosts.length > 0
          ? bestPosts.map((post) => (
              <div className="single-post has-loading" key={post._id}>
                <SinglePost mappedPost={post} refreshUsers={performFetch} />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">No post to show in your feed</div>
            )}
      </div>
    </>
  );
};

export default MostLikedPosts;
