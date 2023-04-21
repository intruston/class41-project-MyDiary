import React from "react";
const Middle = () => {
  const error = "This is an error example";
  return (
    <div className="middle-section">
      <div className="middle-container">
        My Diary <br />
        <br />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Middle;
