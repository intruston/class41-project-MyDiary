import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Oops! You seem to be lost.</h1>
      <br />
      <h2>Page NOT FOUND!</h2>
      <br />
      <br />
      <p>Here are some helpful links:</p>
      <br />
      <Link to="/">Home</Link>
      <br />
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default NotFound;
