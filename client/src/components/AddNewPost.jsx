import React, { useState, useEffect } from "react";
import { icons } from "../assets/svg.js";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch.js";
import Loading from "./Loading.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "./AddNewPost.css";
const AddNewPost = ({ setActive, refreshUsers }) => {
  const { auth } = useAuthContext();
  // Todays date
  const newDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = newDate.toLocaleDateString("en-US", options);
  const userId = auth.id;
  // Inputs
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const sanitizeTags = (value) => {
    return value.replace(/#/g, ""); // Remove '#' symbol globally using regular expression
  };
  //Text are to expand
  function expandTextarea() {
    const textarea = document.getElementById("new-post-content");
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set height to content height
  }
  //Sending post
  const onSuccess = () => {
    setContent("");
    setTags("");
    setIsPrivate(false);
    setActive(false);
    refreshUsers();
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/post/create",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedTags = sanitizeTags(tags); // Remove '#' symbol from tags

    performFetch({
      method: "POST",
      body: JSON.stringify({
        post: { content, tags: sanitizedTags, isPrivate, userId },
      }),
    });
  };

  const handleTabClick = (tab) => {
    setIsPrivate(tab);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-post has-loading">
        <div className="new-post-top">
          <h3>- {formattedDate} -</h3>
          <button
            type="button"
            className="post-exit"
            onClick={() => setActive(false)}
          >
            ✖
          </button>
        </div>

        <textarea
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
          minLength="2"
          className="new-post-content"
          id="new-post-content"
          placeholder="My Dear Diary,"
          onInput={expandTextarea}
        />

        <div className="new-post-tags">
          <h3>Tags</h3>
          <input
            type="text"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
            required
            minLength="2"
            className="new-post-tag-input"
            placeholder="#School #Spring"
          />
        </div>
        <div className="new-post-bottom">
          <div className="new-post-bottom-left">
            <h3
              className={isPrivate ? "" : "active-posts"}
              onClick={() => handleTabClick(false)}
            >
              Public
            </h3>
            <h3
              className={isPrivate ? "active-posts private" : "private"}
              onClick={() => handleTabClick(true)}
            >
              Private
            </h3>
          </div>
          <div className="new-post-bottom-middle">
            {/* {fethed.image && ( */}
            <div className="add-post-image">
              <img
                src="https://cdn.pixabay.com/photo/2022/03/09/14/11/cat-7057971_960_720.png"
                alt="post image"
                onError={(e) => (e.target.src = "")}
              ></img>
            </div>
            {/* )} */}
          </div>
          <div className="new-post-bottom-right">
            <div className="new-post attach"> {icons.attach}</div>

            <button type="submit" className="post-publish-button">
              Publish
            </button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {isLoading && <Loading />}
      </div>
    </form>
  );
};

AddNewPost.propTypes = {
  setActive: PropTypes.func.isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

export default AddNewPost;
