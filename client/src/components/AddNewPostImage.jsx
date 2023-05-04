import React, { useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch.js";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";
import NoPicture from "../assets/NoPicture.png";

const AddNewPostImage = ({ imageUrl, setImageUrl, userId, setImgLoading }) => {
  const inputFileRef = useRef(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/post/upload/${userId}`,
    (response) => {
      setImageUrl(response.result);
      setImgLoading(false);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    return cancelFetch;
  }, [imageUrl]);

  const uploadImageSubmit = (event) => {
    const formData = new FormData();
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setImgLoading(true);
    formData.append("file", selectedFile);

    performFetch(
      {
        method: "POST",
        body: formData,
      },
      true
    );
  };

  if (error) {
    alert(`Error uploading profile picture: ${error}`);
  }

  return (
    <>
      <div className="new-post-bottom-middle">
        <div className="add-post-image">
          <img
            src={imageUrl ? imageUrl : NoPicture}
            alt="post image"
            onError={(e) => (e.target.src = "")}
          ></img>
        </div>
      </div>
      <button
        type="button"
        className="new-post attach"
        onClick={() => inputFileRef.current.click()}
      >
        {icons.attach}
      </button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={uploadImageSubmit}
        hidden
      />
    </>
  );
};

AddNewPostImage.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func.isRequired,
  setImgLoading: PropTypes.bool,
  userId: PropTypes.string,
};

export default AddNewPostImage;
