import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./PopUp.css";

const PopUp = ({ children, isOpen, onClose }) => {
  const popUpRef = useRef(null);

  const closePopUp = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document

    // Check if the click event target is the pop-up element or its immediate children
    if (e.target === popUpRef.current) {
      onClose();
    }
  };

  const closePopUpByButton = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div onClick={closePopUp} ref={popUpRef} className="pop-up">
          <div className="pop-up-content">
            <button
              onClick={closePopUpByButton}
              className="pop-up-close"
              id="popUpButton"
            >
              ✖
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

PopUp.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PopUp;
