import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PopUp from "./PopUp";
import Loading from "./Loading";
import PropTypes from "prop-types";

const DeletePost = ({ postId, refreshUsers }) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${postId}`,
    () => {
      refreshUsers();
    }
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  const openPopup = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    setPopUpOpen(true);
  };

  const closePopUp = () => {
    setPopUpOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "DELETE",
    });
  };

  return (
    <>
      <PopUp isOpen={isPopUpOpen} onClose={closePopUp}>
        <>
          <h5 className="pop-up-message">Sure to delete?</h5>
          <button className="pop-up-button" onClick={handleSubmit}>
            Confirm
          </button>
        </>
      </PopUp>
      <a className="has-loading" onClick={openPopup}>
        {error && <div className="error">{error}</div>}
        {isLoading && <Loading />}Delete
      </a>
    </>
  );
};

DeletePost.propTypes = {
  postId: PropTypes.string,
  refreshUsers: PropTypes.func,
};

export default DeletePost;
