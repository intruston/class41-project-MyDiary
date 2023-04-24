import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { UserContext } from "../hooks/useUserContext";
import "./settingsMiddle.css";
import NoAvatar from "../assets/NoAvatar.png";

const SettingsMiddle = ({ setActive }) => {
  const { user, setUser } = useContext(UserContext);
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
    (response) => {
      onSuccess;
      setUser(response.result);
      setSuccess(true);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);

    const updatedUser = {
      _id: user._id,
      password,
    };
    if (email !== "") updatedUser.email = email;
    if (firstName !== "") updatedUser.firstName = firstName;
    if (lastName !== "") updatedUser.lastName = lastName;
    if (birthday !== "") updatedUser.birthday = birthday;
    if (country !== "") updatedUser.country = country;
    if (bio !== "") updatedUser.bio = bio;

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        // console.log("file here!");
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
  };

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
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePicture
                  ? user.profilePicture
                  : NoAvatar
              }
              alt="profile photo"
              onError={(e) => (e.target.src = NoAvatar)}
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
            required
            minLength="8"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update Profile
          </button>
          {success && (
            <span className="successMessage">Profile has been updated...</span>
          )}
          {isLoading && <div>Loading...</div>}
          {error && <div>Something went wrong! Error: {error}</div>}
        </form>
      </div>
    </div>
  );
};

SettingsMiddle.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default SettingsMiddle;
