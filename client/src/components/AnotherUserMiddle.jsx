import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import ProfilePicture from "./ProfilePicture";
import FollowUnfollowButton from "./FollowUnfollowButton";
import { usePostsContext } from "../hooks/usePostsContext";

const AnotherUserMiddle = () => {
  const { id } = useParams();
  const {
    isLoading: anotherUserLoading,
    error: anotherUserError,
    anotherUser,
    reset: resetAnotherUser, // add reset function here
  } = useGetAnotherUser({
    anotherUserId: id,
  });
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [fetch, setFetch] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${id}?limit=10&page=${currentPage}`,
    (response) => {
      setFetch(false);
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
    resetAnotherUser(); // call reset function here
    performFetch();
    return cancelFetch;
  }, [id]);

  useEffect(() => {
    if (fetch && currentPage !== 1) {
      performFetch();
    }
    return cancelFetch;
  }, [fetch]);

  // NO filter posts so Moderator will se sign but post disappear from feed only after fetching
  // or filter if we want banned post disappears at the same moment as ban pushed
  const filteredPosts = posts;
  // .filter((post) => {
  //   return !post.isPrivate && !post.isBanned;
  // });

  // using Intersection Observer for fetching new posts when we see the last post on the page
  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (anotherUserLoading || isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setCurrentPage((prevPage) => prevPage + 1);
          setFetch(true);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, anotherUserLoading, hasNextPage]
  );

  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="page-header has-loading">
          {anotherUserLoading && <Loading />}

          <div className="left">
            <h2>{anotherUser && anotherUser.firstName}</h2>
            <h2>{anotherUser && anotherUser.lastName}</h2>
            <br />
            <h4>
              <strong>{filteredPosts && filteredPosts.length}</strong>{" "}
              {filteredPosts.length > 1 ? "posts" : "post"}
            </h4>
            <button>
              <FollowUnfollowButton anotherUserId={id} />
            </button>
          </div>
          <div className="another-profile">
            <ProfilePicture
              profilePicture={anotherUser && anotherUser.profilePicture}
              size={"large"}
            />
          </div>
          <div className="right">
            <h3>{`"${anotherUser && anotherUser.bio}"`}</h3>
          </div>
        </div>
        {error && <div className="error">{error.message || error}</div>}
        {anotherUserError && (
          <div className="error">
            {anotherUserError.message || anotherUserError}
          </div>
        )}
      </div>
      {/* Posts */}
      {isLoading && (
        <div className="load-container">
          .
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
                <SinglePost mappedPost={post} />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">This user not yet post anything</div>
            )}
      </div>
    </div>
  );
};

export default AnotherUserMiddle;
