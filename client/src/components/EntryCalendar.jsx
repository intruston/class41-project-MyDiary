import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EntryCalendar.css";
import { useDateContext } from "../hooks/useDateContext";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

const EntryCalendar = () => {
  const [value, onChange] = useState(new Date());
  const { user } = useUserContext();

  //getting post data
  const [posts, setPosts] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);
  useEffect(() => {
    return cancelFetch;
  }, []);

  const { date, setDate } = useContext(useDateContext);
  //set value to selected day
  const handleDateChange = (value) => {
    //the value of data that passing into setDate have to be in a format (Does not mater which one!)
    //this format is YYYY-MM-DD (like in mongo)
    const formattedDate = value
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    onChange(formattedDate);
    setDate(formattedDate);
  };

  const today = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dateString = today.toLocaleDateString("en-US", options);
  const handleCalendar = () => {
    setDate(null);
  };

  //highlight the date of posts
  if (posts) {
    const tileClassName = ({ date }) => {
      const postDates = posts.map((post) => {
        const createdAt = new Date(post.createdAt);
        createdAt.setDate(createdAt.getDate() - 1); // subtract 1 day
        return `${createdAt.getFullYear()}-${padZero(
          createdAt.getMonth() + 1
        )}-${padZero(createdAt.getDate())}`;
      });
      const dateString = date.toISOString().substr(0, 10);
      const hasPost = postDates.includes(dateString);
      return hasPost ? "highlight" : null;
    };

    // Helper function to pad zero to single digit numbers
    const padZero = (num) => {
      return num < 10 ? `0${num}` : num;
    };

    return (
      <div>
        <div className="icon-container">
          <h2>{dateString}</h2>
          {date && (
            <EventRepeatIcon
              titleAccess="clear date"
              onClick={handleCalendar}
              fontSize="large"
            />
          )}
        </div>

        <div className="calendar-container">
          {isLoading && <Loading />}
          <Calendar
            calendarClassName="my-calendar"
            onChange={handleDateChange}
            value={value}
            tileClassName={tileClassName}
            locale="en"
            maxDate={new Date()} //this line disables selecting future dates
          />
          {error && <div className="error">{error.message}</div>}
        </div>
      </div>
    );
  }
};

export default EntryCalendar;
