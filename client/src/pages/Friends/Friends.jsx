import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import FriendsMiddle from "./FriendsMiddle";
import FriendsRight from "./FriendsRight";
import "./Friends.css";

const Friends = () => {
  const [searchData, setSearchData] = useState({});

  return (
    <div className="page-container">
      <Navbar active={"Friends"} />
      <FriendsMiddle searchData={searchData} />
      <FriendsRight
        onSearchDataChange={(newSearchData) => {
          setSearchData(newSearchData);
        }}
      />
    </div>
  );
};

export default Friends;
