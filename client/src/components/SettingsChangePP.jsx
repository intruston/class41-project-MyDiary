import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ProfilePicture from "./ProfilePicture";

const SettingsChangePP = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [selectedFile, setSelectedFile] = useState(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/user/upload/${user._id}`,
    (response) => {
      setProfilePicture(response.result);
      alert("Profile picture updated successfully");
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const uploadPhotoSubmit = async (e) => {
    // e.preventDefault();
    setSelectedFile(e.target.files[0]);

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    performFetch({
      method: "POST",
      headers: {},
      body: formData,
    });
  };

  if (error) {
    alert(`Error uploading profile picture: ${error}`);
  }

  return (
    <div className="settings-change-PP">
      {selectedFile ? (
        <div className="image-wrapper">
          <img src={URL.createObjectURL(selectedFile)} alt="profile photo" />
        </div>
      ) : (
        <ProfilePicture profilePicture={profilePicture} size={"medium"} />
      )}

      <label htmlFor="fileInput">
        <div className="add-photo-icon">
          <AddAPhotoOutlinedIcon sx={{ fontSize: 50 }} />
        </div>
      </label>
      <input type="file" id="fileInput" hidden onChange={uploadPhotoSubmit} />
    </div>
  );
};

SettingsChangePP.propTypes = {
  user: PropTypes.object,
  profilePicture: PropTypes.string,
  setProfilePicture: PropTypes.func,
};

export default SettingsChangePP;
