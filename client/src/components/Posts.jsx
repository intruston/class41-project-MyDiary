import React from "react";
import SinglePost from "./SinglePost";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="public-private">
        <h3>Public Posts</h3>
        <h3>Private Posts</h3>
      </div>
      <div>
        {posts &&
          posts.map((mappedPost) => (
            <SinglePost key={mappedPost._id} mappedPost={mappedPost} />
          ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.element.isRequired,
};

export default Posts;
