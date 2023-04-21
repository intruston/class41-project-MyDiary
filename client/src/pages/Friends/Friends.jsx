import React from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./Friends.css";
const Friends = () => {
  return (
    <div className="page-container">
      <Navbar active={"Friends"} />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Friends;
