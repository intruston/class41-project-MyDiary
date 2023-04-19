import React from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./Search.css";
const Search = () => {
  return (
    <div className="page-container">
      <Navbar active={"Search"} />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default Search;
