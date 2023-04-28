import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";
import "./settingsMiddle.css";
import SettingsChangePP from "./SettingsChangePP";
import Loading from "./Loading";

const SettingsMiddle = ({ setModalPasswordActive, setModalDeleteActive }) => {
  const { auth } = useAuthContext();
  const { user, dispatch, getUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const onSuccess = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthday("");
    setCountry("");
    setBio("");
    setPassword("");
    alert("Profile has been updated!");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${user?._id}`,
    (response) => {
      dispatch({
        type: "UPDATE_USER",
        payload: response.result,
      });
      onSuccess();
    }
  );

  useEffect(() => {
    getUser(auth.id, auth.token);
    return cancelFetch;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      alert("Please enter your password for submit");
      return;
    }

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

    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(updatedUser),
    });
  };

  return (
    <div className="middle-section">
      <div className="middle-container">
        <div className="settings-title">
          <span className="settings-update-title">Update Your Account</span>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-form-wrapper">
            <SettingsChangePP />
            <div className="settings-input-block firstname">
              <label htmlFor="firstName">First name</label>
              <input
                className="settings-short-input"
                name="firstName"
                value={firstName}
                type="text"
                placeholder={user?.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="settings-input-block lastname">
              <label htmlFor="lastName">Last name</label>
              <input
                className="settings-short-input"
                name="lastName"
                value={lastName}
                type="text"
                placeholder={user?.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="settings-input-block birthday">
              <label htmlFor="birthday">Birthday</label>
              <input
                className="settings-short-input"
                name="birthday"
                value={birthday}
                type="text"
                onFocus={(e) => {
                  e.currentTarget.type = "date";
                }}
                placeholder={user?.birthday.slice(0, 10)}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div className="settings-input-block country">
              <label htmlFor="country">Country</label>
              <input
                className="settings-short-input"
                name="country"
                value={country}
                type="text"
                placeholder={user?.country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="settings-input-block bio">
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                value={bio}
                className="settings-bio-input"
                placeholder={user?.bio}
                rows="7"
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <div className="settings-input-block email">
              <label htmlFor="email">Email</label>
              <input
                className="settings-short-input"
                name="email"
                value={email}
                type="email"
                placeholder={user?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="settings-input-block password">
              <label htmlFor="password">Password</label>
              <input
                className="settings-short-input"
                name="password"
                value={password}
                type="password"
                required
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="change-password-button"
              type="button"
              onClick={() => setModalPasswordActive(true)}
            >
              Change Password
            </button>

            <button className="settings-submit-button" type="submit">
              Update Profile
            </button>

            <div className="settings-delete-title">
              <span onClick={() => setModalDeleteActive(true)}>
                Permanently <b>delete your account</b> and all of your content.
              </span>
            </div>

            {isLoading && (
              <div>
                <Loading />{" "}
              </div>
            )}
            {error && <div>Something went wrong! Error: {error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

SettingsMiddle.propTypes = {
  setModalDeleteActive: PropTypes.func.isRequired,
  setModalPasswordActive: PropTypes.func.isRequired,
};

export default SettingsMiddle;
