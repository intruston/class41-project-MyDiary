import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";
import DatesProvider from "./hooks/useDateContext";
ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <UserContextProvider>
        <DatesProvider>
          <App />
        </DatesProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
