import React from "react";
import { icons } from "../assets/svg";
import "./NewPostModal.css";
import PropTypes from "prop-types";

const NewPostModal = ({ closeModal }) => {
  return (
    <div onClick={closeModal} className="new-post-modal">
      <div className="modal-inside" onClick={(e) => e.stopPropagation()}>
        <div onClick={closeModal} className="close-modal">
          {icons.close}
        </div>
        <div>Div inside</div>
      </div>
    </div>
  );
};

// This required for Eslint, without this: { props } make a problem.
NewPostModal.propTypes = {
  closeModal: PropTypes.element.isRequired,
};

export default NewPostModal;
