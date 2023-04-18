import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./hooks/useUserContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Nav from "./components/Nav";

const App = () => {
  const { user } = useContext(UserContext); // using useContext to get the user value from UserContext, if user is not null: means user logged in
  return (
    <>
      {/* Don't show Navbar before user Logged in*/}
      {user && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* When Login it will automatically navigate to profile page*/}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/profile" />}
        />
        <Route path="/signup" element={<SignUp />} />
        {/* To secure we need to check if there is user to show this page*/}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
