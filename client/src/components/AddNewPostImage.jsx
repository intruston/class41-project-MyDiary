import React, { useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch.js";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";

const AddNewPostImage = ({ imageUrl, setImageUrl, userId }) => {
  const inputFileRef = useRef(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/post/upload/${userId}`,
    (response) => {
      setImageUrl(response.result);
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
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.pixabay.com/photo/2022/03/09/14/11/cat-7057971_960_720.png"
            }
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
  userId: PropTypes.string,
};

export default AddNewPostImage;
