import React from "react";

import PropTypes from "prop-types";

const FriendsPageHeader = ({ friendCount }) => {
  return (
    <div className="page-header">
      <div className="left">
        <h2>Friends</h2>
        <h4>
          <strong>{friendCount}</strong> Friends
        </h4>
      </div>
      <div>
        <form>
          <div className="search-wrapper">
            <input type="text" id="search-input" placeholder="Find my friend" />
          </div>
        </form>
      </div>
    </div>
  );
};

FriendsPageHeader.propTypes = {
  friendCount: PropTypes.number,
};

export default FriendsPageHeader;
