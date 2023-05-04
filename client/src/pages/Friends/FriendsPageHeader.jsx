import React from "react";

import PropTypes from "prop-types";

const FriendsPageHeader = ({ friendCount }) => {
  return (
    <div className="page-header friends-page-header">
      <div>
        <h2>Friends</h2>
        <h4>
          <strong>{friendCount}</strong> Friends
        </h4>
      </div>
      <div>
        <form className="search-form no-wrap">
          <input type="text" placeholder="Find my friend" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

FriendsPageHeader.propTypes = {
  friendCount: PropTypes.number,
};

export default FriendsPageHeader;