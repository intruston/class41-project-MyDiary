import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";
import DatesProvider from "./hooks/useDateContext";
import { PostsContextProvider } from "./context/PostsContext";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <UserContextProvider>
        <PostsContextProvider>
          <DatesProvider>
            <App />
          </DatesProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
