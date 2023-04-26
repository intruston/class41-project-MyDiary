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
    //!!!delete the part below after we finish with the frontend!!!
    // if (!user) {
    //   setUser({
    //     _id: "643d9697b5f5be3e8607144c",
    //     email: "john@doe.com",
    //     password: "12345678",
    //     firstName: "John",
    //     lastName: "Doe",
    //     birthday: "2003-04-20T00:00:00.000+00:00",
    //     country: "The Netherlands",
    //     bio: "Welcome to my diary!",
    //   });
    // }
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
