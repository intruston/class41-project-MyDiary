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
  // const [activeTab, setActiveTab] = useState("public");
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

  // eslint-disable-next-line no-console
  console.log(posts);
  const { setDate } = useContext(postDatesContext);
  //set value to selected day
  const handleDateChange = (value) => {
    onChange(value);
    setDate(value);
  };

  //highlight dates of posts
  if (posts) {
    // const tileClassName = ({ date }) => {
    //   const realDate = `${date.getDate()}.${
    //     date.getMonth() + 1
    //   }.${date.getFullYear()}`;
    //   const hasPost = posts.some((post) => post.createdAt === realDate);
    //   return hasPost ? "highlight" : null;
    // };
    const tileClassName = ({ date }) => {
      const postDates = posts.map((post) => post.createdAt.substr(0, 10));
      const dateString = date.toISOString().substr(0, 10);
      const hasPost = postDates.includes(dateString);
      return hasPost ? "highlight" : null;
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
        />
        {error && <div className="error">{error.message}</div>}
      </div>
    );
  }
};

export default EntryCalendar;
