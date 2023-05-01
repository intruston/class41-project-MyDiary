import React, { useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../hooks/useUserContext";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ProfilePicture from "./ProfilePicture";

const SettingsChangePP = () => {
  const { user, dispatch } = useUserContext();
  const inputFileRef = useRef(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/user/upload/${user?._id}`,
    (response) => {
      dispatch({
        type: "SET_USER",
        payload: { ...user, profilePicture: response.result },
      });
      alert("Profile picture uploaded successfully");
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const uploadPhotoSubmit = (event) => {
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
    <div className="settings-change-PP">
      <ProfilePicture profilePicture={user?.profilePicture} size={"medium"} />

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

export default SettingsChangePP;
