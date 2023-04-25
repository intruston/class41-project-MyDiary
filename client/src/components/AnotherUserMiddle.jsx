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
  } = useGetAnotherUser({
    anotherUserId: id,
  });
  const [posts, setPosts] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${anotherUser && anotherUser._id}`,
    (response) => {
      setPosts(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [posts]);

  return (
    <div className="middle-section">
      <div className="middle-container">
        {/* Page Header */}
        <div className="page-header">
          {anotherUserLoading && <Loading />}
          <div className="another-profile">
            <ProfilePicture
              profilePicture={anotherUser && anotherUser.profilePicture}
              size={"small"}
            />
          </div>

          <div className="left">
            <h2>{anotherUser && anotherUser.firstName}</h2>
            <h4>
              <strong>{posts && posts.length}</strong> Post
            </h4>
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

        {/* Posts */}
        <div>
          {posts &&
            posts
              .filter((mappedPost) => {
                return !mappedPost.isPrivate;
              })
              .map((mappedPost) => (
                <div className="single-post has-loading" key={mappedPost._id}>
                  {isLoading && <Loading />}
                  <SinglePost mappedPost={mappedPost} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AnotherUserMiddle;
