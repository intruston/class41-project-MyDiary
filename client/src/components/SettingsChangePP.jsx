import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ProfilePicture from "./ProfilePicture";

const SettingsChangePP = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const inputFileRef = useRef(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/user/upload/${user._id}`,
    (response) => {
      setProfilePicture(response.result);
      alert("Profile picture uploaded successfully");
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const uploadPhotoSubmit = async (event) => {
    const formData = new FormData();
    const selectedFile = event.target.files[0];
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
      <ProfilePicture profilePicture={profilePicture} size={"medium"} />

      <button
        type="button"
        className="add-photo-button"
        onClick={() => inputFileRef.current.click()}
      >
        <AddAPhotoOutlinedIcon sx={{ fontSize: "60px" }} />
      </button>

      <input
        ref={inputFileRef}
        type="file"
        onChange={uploadPhotoSubmit}
        hidden
      />
    </div>
  );
};

SettingsChangePP.propTypes = {
  user: PropTypes.object,
  profilePicture: PropTypes.string,
  setProfilePicture: PropTypes.func,
};

export default SettingsChangePP;
