import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import useGetAnotherUser from "../hooks/useGetAnotherUser";

import ProfilePicture from "./ProfilePicture";

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
            <h4>
              <strong>{posts && posts.length}</strong> Post
            </h4>
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
        {(error || anotherUserError) && (
          <div className="error">
            {error.message}||{anotherUserError.message}
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
