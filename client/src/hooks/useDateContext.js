import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

const DateContext = createContext(null);

//Creating a date context to hold selected date information
export const useDateContext = () => {
  const context = useContext(DateContext);
  return context;
};

export const DatesProvider = ({ children }) => {
  const [date, setDate] = useState(null);

  // This will be provided
  const contextValue = {
    date,
    setDate,
  };

  // We will provide from Index.jsx, otherwise can't call date in MyPostsMiddle.jsx
  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
DatesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DatesProvider;
