import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserProvider } from "./hooks/useUserContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
