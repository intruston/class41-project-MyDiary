import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./hooks/useUserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";
import DatesProvider from "./hooks/usePostDatesContext";

ReactDOM.render(
  <AppWrapper>
    <UserProvider>
      <DatesProvider>
        <App />
      </DatesProvider>
    </UserProvider>
  </AppWrapper>,
  document.getElementById("root")
);
