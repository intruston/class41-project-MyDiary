import { createContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

//Creating a user context to hold user information
export const UserContext = createContext([]);

//Providing basic functions to control user
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  // This will be provided
  const contextValue = {
    user,
    setUser,
    login,
    logout,
  };

  // We will provide from Index.jsx, otherwise can't call -user- in app.jsx
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
