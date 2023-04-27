import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EntryCalendar.css";

const EntryCalendar = () => {
  const [value, onChange] = useState(new Date());
  const myPostList = [
    "11.4.2023",
    "12.4.2023",
    "9.4.2023",
    "24.4.2023",
    "20.5.2023",
    "17.3.2023",
  ];

  const tileClassName = ({ date }) => {
    const realDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    if (myPostList.includes(realDate)) {
      return "highlight";
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        calendarClassName="my-calendar"
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        locale="en"
      />
    </div>
  );
};

export default EntryCalendar;
