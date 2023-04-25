import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import React from "react";

//Creating a user context to hold user information
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

//Providing basic functions to control user
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
