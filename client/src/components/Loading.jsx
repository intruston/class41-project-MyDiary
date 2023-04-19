import React from "react";
import PropTypes from "prop-types";
function Loading({ loadMessage }) {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
      {loadMessage && (
        <div className="spin-message">
          <p>{loadMessage}</p>
        </div>
      )}
    </div>
  );
}

// This required for Eslint, without this: { props } make a problem.
Loading.propTypes = {
  loadMessage: PropTypes.string,
};
export default Loading;
