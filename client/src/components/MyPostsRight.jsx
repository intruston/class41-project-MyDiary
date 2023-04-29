import React, { useContext } from "react";
import EntryCalendar from "./EntryCalendar";
import FriendsList from "./FriendsList";
import { useDateContext } from "../hooks/useDateContext";

const MyPostsRight = () => {
  const { isSelected, setIsSelected, showCalendar, setShowCalendar } =
    useContext(useDateContext);

  const handleCalendarToggle = () => {
    if (isSelected && !showCalendar) {
      setShowCalendar(true);
    } else {
      setShowCalendar(!showCalendar);
      setIsSelected(!isSelected);
    }
  };

  return (
    <div className="right-section">
      <div className="triple-container">
        <div className="top-div has-loading">
          <button onClick={handleCalendarToggle}>Toggle Calendar</button>
          {showCalendar && isSelected && <EntryCalendar />}
        </div>
        <div className="middle-div">
          <FriendsList />
        </div>
        <div className="bottom-div has-loading">This will be popular tags</div>
      </div>
    </div>
  );
};

export default MyPostsRight;
