import React from "react";
import Loading from "./Loading";
const FeedsRight = () => {
  const loading = true;
  const error = "This is an error example";
  return (
    <div className="right-section">
      <div className="triple-container">
        <div className="top-div has-loading">
          {error && <div className="error">{error}</div>}
          {loading && (
            <Loading loadMessage={"Loading will blur the background"} />
          )}
        </div>
        <div className="middle-div">
          -Error and loading is: only in the parts they are relative. Not the
          whole page
          <br />
          <br />
          -If some div has loading in it: It must have the class has-loading
          <br />
          <br />
          {error && <div className="error">{error}</div>}
        </div>
        <div className="bottom-div has-loading">
          {error && <div className="error">{error}</div>}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default FeedsRight;
