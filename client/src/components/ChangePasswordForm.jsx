import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";
import Loading from "./Loading";
import "./changePasswordForm.css";

const ChangePasswordForm = ({ setModalPasswordActive }) => {
  const { user } = useUserContext();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCopy, setNewPasswordCopy] = useState("");

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/password/${user?._id}`,
    () => {
      // (response) => {
      // setUser(response.result);
      setPassword("");
      setNewPassword("");
      setNewPasswordCopy("");
      setModalPasswordActive(false);
      alert("Password changed successfully!");
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const changePassword = (e) => {
    e.preventDefault();

    if (newPassword === newPasswordCopy) {
      const updatedUserPassword = {
        _id: user._id,
        password,
        newPassword,
      };

      performFetch({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserPassword),
      });
    } else {
      alert("New passwords must match!");
    }
  };

  return (
    <>
      <div className="changePasswordWrapper">
        <h2>Change password</h2>
        <form className="changePasswordForm" onSubmit={changePassword}>
          <label>Enter your old password</label>
          <input
            type="password"
            required
            minLength="8"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter the new password</label>
          <input
            type="password"
            required
            minLength="8"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Enter the new password again</label>
          <input
            type="password"
            required
            minLength="8"
            onChange={(e) => setNewPasswordCopy(e.target.value)}
            className={newPassword !== newPasswordCopy ? "input-warning" : ""}
          />
          <div className="buttonsWrapper">
            <button
              className="changePasswordCancel"
              type="button"
              onClick={() => setModalPasswordActive(false)}
            >
              Cancel
            </button>
            <button className="changePasswordSubmit" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
      <br />
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </>
  );
};

ChangePasswordForm.propTypes = {
  setModalPasswordActive: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
