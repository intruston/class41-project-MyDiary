import React from "react";

import PropTypes from "prop-types";
import loop from "../assets/search.png";
import noImage from "../assets/no-image.png";
const handleSearch = (event) => {
  event.preventDefault();
  const searchText = event.target.previousSibling.value.trim(); //take value from input to search on page
  if (searchText) {
    window.find(searchText);
  }
};
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
        <form className="friends-search-form no-wrap">
          <input type="text" placeholder="Find my friend" />
          <button
            type="submit"
            className="search-button"
            onClick={handleSearch}
          >
            <img
              src={loop}
              alt="Search"
              onError={(e) => (e.target.src = noImage)}
            />
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
