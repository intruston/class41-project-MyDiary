import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { usePostsContext } from "../hooks/usePostsContext";
import { useUserContext } from "../hooks/useUserContext";
import SinglePost from "./SinglePost";
import Loading from "./Loading";

const ModerationPosts = ({ status }) => {
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/moderation/${status}/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [status]);

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  return (
    <>
      <div>
        {posts === [] ? (
          <div className="no-banned-posts">No any posts yet</div>
        ) : (
          posts.map((mappedPost) => (
            <div className="single-post has-loading" key={mappedPost._id}>
              <SinglePost mappedPost={mappedPost} />
            </div>
          ))
        )}
      </div>

      {isLoading && <Loading />}
      {error && <div className="error">{error.message}</div>}
    </>
  );
};

ModerationPosts.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ModerationPosts;
