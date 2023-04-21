import React from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./MyPosts.css";
const MyPosts = () => {
  return (
    <div className="page-container">
      {/* active must be same with navbar name of the page */}
      <Navbar active={"My diary"} />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default MyPosts;
