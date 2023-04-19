import React from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./Feeds.css";
const Feeds = () => {
  return (
    <div className="page-container">
      <Navbar active={"Feeds"} />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Feeds;
