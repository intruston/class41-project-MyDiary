import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./hooks/useUserContext";
import Home from "./pages/Home/Home";
import MyPosts from "./pages/MyPosts/MyPosts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Friends from "./pages/Friends/Friends";
import Feeds from "./pages/Feeds/Feeds";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";

const App = () => {
  const { user } = useContext(UserContext); // using useContext to get the user value from UserContext, if user is not null: means user logged in
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* When Login it will automatically navigate to profile page*/}
        {/* To secure we need to check if there is user to show this page*/}
        <Route
          path="/login"
          element={user ? <Navigate to="/myPosts" /> : <Login />}
        />
        <Route
          path="/signUp"
          element={user ? <Navigate to="/myPosts" /> : <SignUp />}
        />
        <Route
          path="/myPosts"
          element={user ? <MyPosts /> : <Navigate to="/" />}
        />
        <Route
          path="/friends"
          element={user ? <Friends /> : <Navigate to="/" />}
        />
        <Route path="/feeds" element={user ? <Feeds /> : <Navigate to="/" />} />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
