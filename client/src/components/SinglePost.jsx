import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import "./SinglePost.css";

import useGetAnotherUser from "../hooks/useGetAnotherUser";
import ProfilePicture from "./ProfilePicture";
import PostReaction from "./PostReaction";
import PostDate from "./PostDate";
import DropdownMenu from "./DropdownMenu";
import DeletePost from "./DeletePost";
import BanPost from "./BanPost";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Loading from "./Loading";
import PopUp from "./PopUp";
import ReportPost from "./ReportPost";

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost, refreshUsers }) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { user } = useUserContext();
  const { isLoading, error, anotherUser } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });

  //Limit text inside result in 140 symbols. Otherwise ...Show more
  const MAX_CONTENT_LENGTH = 140;
  const [showMore, setShowMore] = useState(false);
  const content = showMore
    ? mappedPost.content
    : mappedPost.content.slice(0, MAX_CONTENT_LENGTH);

  const handleShowMore = (event) => {
    event.preventDefault();
    setShowMore(true);
  };
  const profileLink =
    anotherUser?._id === user._id ? "/my-posts" : `/user/${anotherUser?._id}`;
  const openPopup = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    setPopUpOpen(true);
  };

  return (
    <div className="single-post-component">
      <div className="pos-container">
        {/* Profile Picture */}
        <div className="side-profile has-loading">
          <Link to={profileLink}>
            {isLoading && <Loading />}
            <ProfilePicture
              profilePicture={anotherUser ? anotherUser.profilePicture : null}
              size={"small"}
            />
          </Link>
        </div>

        {/* Post */}
        <div className="post-content">
          <div className="post-header">
            <Link to={profileLink}>
              <h3 className="profile-name">
                {anotherUser ? anotherUser.firstName : null}
              </h3>
            </Link>
            <div className="post-right-side">
              {/* Date */}
              <PostDate date={mappedPost.createdAt} />
              <DropdownMenu>
                <summary role="button">
                  <a className="dropdownButton">...</a>
                </summary>
                <ul>
                  <DeletePost
                    postId={mappedPost._id}
                    refreshUsers={refreshUsers}
                    anotherUserId={anotherUser?._id}
                  />
                  <ReportPost post={mappedPost} refreshUsers={refreshUsers} />
                  <BanPost post={mappedPost} refreshUsers={refreshUsers} />
                </ul>
              </DropdownMenu>
            </div>
          </div>
          {/* Post Content */}{" "}
          <div className="post-context-text">
            {mappedPost.image && (
              <>
                <PopUp isOpen={isPopUpOpen} setPopUpOpen={setPopUpOpen}>
                  <div className="popUp-Image-container">
                    <img
                      src={mappedPost.image}
                      alt="post image"
                      onError={(e) => (e.target.src = "")}
                    ></img>
                  </div>
                </PopUp>
                <div className="post-image">
                  <img
                    onClick={openPopup}
                    src={mappedPost.image}
                    alt="post image"
                    onError={(e) => (e.target.src = "")}
                  ></img>
                </div>
              </>
            )}
            {content}
            {mappedPost.content.length > MAX_CONTENT_LENGTH && !showMore && (
              <span>
                ...{" "}
                <a href="#" className="show-link" onClick={handleShowMore}>
                  Show more
                </a>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Post Bottom */}
      <div className="post-bottom">
        <p className="post-bottom-tags">
          {mappedPost.tags.map((tag) => (
            <span key={tag}>#{tag.toUpperCase()}&nbsp;</span>
          ))}
        </p>
        {mappedPost.isBanned ? (
          <RemoveCircleIcon sx={{ color: "red" }} />
        ) : (
          <PostReaction id={mappedPost._id} totalLikes={mappedPost.likes} />
        )}
      </div>

      {error && <div className="error">{error.message || error}</div>}
    </div>
  );
};

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

export default SinglePost;
