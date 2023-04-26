import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import React from "react";

//Creating a user context to hold user information
export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    case "USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Providing basic functions to control user
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  // Actions
  async function getUser(id, token) {
    try {
      const url = `${process.env.BASE_SERVER_URL}/api/user/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const config = { headers };

      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const json = await response.json();
      dispatch({
        type: "GET_USER",
        payload: json.result,
      });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.message,
      });
    }
  }

  return (
    <UserContext.Provider value={{ ...state, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
