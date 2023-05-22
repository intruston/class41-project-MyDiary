import React from "react";
import moment from "moment";
import EntryCalendar from "./EntryCalendar";
import DropdownMenu from "./DropdownMenu";
import { useDateContext } from "../hooks/useDateContext";
import "./CalendarSmall.css";

const CalendarSmall = () => {
  const { date } = useDateContext();

  return (
    <div className="calendar-small">
      <DropdownMenu>
        <summary role="button">
          <h4 className={date ? "dated dropdownButton" : "dropdownButton"}>
            {date ? moment(date).format("DD MMMM YYYY") : "Date"}
          </h4>
        </summary>
        <ul>
          <EntryCalendar />
        </ul>
      </DropdownMenu>
    </div>
  );
};

export default CalendarSmall;
