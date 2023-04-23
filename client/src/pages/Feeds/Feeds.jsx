import React from "react";
import Navbar from "../../components/Navbar";
import FeedsMiddle from "../../components/FeedsMiddle";
import FeedsRight from "../../components/FeedsRight";
import "./Feeds.css";
const Feeds = () => {
  return (
    <div className="page-container">
      <Navbar active={"Feeds"} />
      <FeedsMiddle />
      <FeedsRight />
    </div>
  );
};

export default Feeds;
