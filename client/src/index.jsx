import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./hooks/useUserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <UserProvider>
      <App />
    </UserProvider>
  </AppWrapper>,
  document.getElementById("root")
);
