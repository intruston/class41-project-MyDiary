import React from "react";
import PropTypes from "prop-types";
import "./changePasswordForm.css";

const ChangePasswordForm = ({ setActive }) => {
  return (
    <div className="changePasswordWrapper">
      <h2>ChangePasswordForm</h2>
      <form className="changePasswordForm" onSubmit={() => {}}>
        <label>Enter new password</label>
        <input
          type="password"
          // onChange={(e) => setPassword(e.target.value)}
        />
        <label>Enter new password again</label>
        <input
          type="password"
          // onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttonsWrapper">
          <button
            className="changePasswordCancel"
            type="button"
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
          <button className="changePasswordSubmit" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

ChangePasswordForm.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
