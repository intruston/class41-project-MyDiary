import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EntryCalendar.css";
import { postDatesContext } from "../hooks/usePostDatesContext";
import { useContext } from "react";

import { UserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

const EntryCalendar = () => {
  const [value, onChange] = useState(new Date());

  //getting post data
  const { user } = useContext(UserContext);
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

  useEffect(() => {}, [posts]);

  const { setDate } = useContext(postDatesContext);
  //set value to selected day
  const handleDateChange = (value) => {
    onChange(value);
    setDate(value);
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
    );
  }
};

export default EntryCalendar;
