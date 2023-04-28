import React from "react";
import PropTypes from "prop-types";

const DeleteProfileForm = ({ setModalDeleteActive }) => {
  return (
    <div>
      <button onClick={() => setModalDeleteActive(false)}> X </button>
      <div>DeleteProfileForm</div>
    </div>
  );
};

DeleteProfileForm.propTypes = {
  setModalDeleteActive: PropTypes.func.isRequired,
};

export default DeleteProfileForm;
