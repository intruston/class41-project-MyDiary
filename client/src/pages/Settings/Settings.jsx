import React from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./Settings.css";
const Settings = () => {
  return (
    <div className="page-container">
      <Navbar active={"Settings"} />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Settings;
