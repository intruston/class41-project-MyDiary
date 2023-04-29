import { createContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";
//Creating a date context to hold selected date information
export const useDateContext = createContext(null);
export const DatesProvider = ({ children }) => {
  const [date, setDate] = useState(null);
  const [isSelected, setIsSelected] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  // This will be provided
  const contextValue = {
    date,
    setDate,
    isSelected,
    setIsSelected,
    showCalendar,
    setShowCalendar,
  };

  // We will provide from Index.jsx, otherwise can't call date in MyPostsMiddle.jsx
  return (
    <useDateContext.Provider value={contextValue}>
      {children}
    </useDateContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
DatesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DatesProvider;
