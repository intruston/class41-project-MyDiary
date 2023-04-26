import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
