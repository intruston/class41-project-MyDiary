import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../hooks/useUserContext";
import PropTypes from "prop-types";
import profileIcon from "../assets/profile-icon.png";

const SettingsMiddle = ({ setActive }) => {
  const { user } = useUserContext();
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const onSuccess = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthday("");
    setCountry("");
    setBio("");
    setPassword("");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${user?._id}`,
    () => {
      onSuccess;
      setSuccess(true);
      alert("User updated successfully");
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== user.password) {
      return alert(
        "Wrong password! Please enter your password to confirm this changes."
      );
    }

    const updatedUser = {
      _id: user._id,
      email,
      firstName,
      lastName,
      birthday,
      country,
      bio,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        //upload the file
      } catch (error) {
        //error
      }
    }

    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  }

  return (
    <div className="middle-section">
      <div className="middle-container">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              // src={file ? URL.createObjectURL(file) : user.profilePicture}
              src={profileIcon} // must be changed to user.profilePicture
              alt="profile photo"
            />
            <label htmlFor="fileInput">
              <i className="setPPButton">Change picture</i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>First name</label>
          <input
            type="text"
            placeholder={user?.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last name</label>
          <input
            type="text"
            placeholder={user?.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Birthday</label>
          <input
            type="date"
            placeholder={user?.birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <label>Country</label>
          <input
            type="text"
            placeholder={user?.country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label>Bio</label>
          <input
            type="text"
            placeholder={user?.bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="passwordLabel">
            <label>Please enter your password to confirm</label>
            <button
              className="changePasswordButton"
              type="button"
              onClick={() => setActive(true)}
            >
              Change Password
            </button>
          </div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update Profile
          </button>
          {success && (
            <span className="successMessage">Profile has been updated...</span>
          )}
          {isLoading && <div>Loading...</div>}
          {error && <div>Something is wrong: {error.message}</div>}
        </form>
      </div>
    </div>
  );
};

SettingsMiddle.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default SettingsMiddle;
