import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import useGetAnotherUser from "../hooks/useGetAnotherUser";
import ProfilePicture from "./ProfilePicture";
import FollowUnfollowButton from "./FollowUnfollowButton";

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
  const [posts, setPosts] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${id}`,
    (response) => {
      setPosts(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [id]);

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    resetAnotherUser(); // call reset function here
  }, [id]);

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
              <strong>{posts && posts.length}</strong>{" "}
              {posts.length > 1 ? "posts" : "post"}
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
        {posts.length > 0
          ? posts
              .filter((mappedPost) => {
                return !mappedPost.isPrivate;
              })
              .map((mappedPost) => (
                <div className="single-post has-loading" key={mappedPost._id}>
                  <SinglePost
                    mappedPost={mappedPost}
                    refreshUsers={performFetch}
                  />
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
