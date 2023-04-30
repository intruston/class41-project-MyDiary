import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPosts from "./pages/MyPosts/MyPosts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Friends from "./pages/Friends/Friends";
import Feeds from "./pages/Feeds/Feeds";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";
import AnotherUser from "./pages/AnotherUser/AnotherUser";
import { useAuthContext } from "./hooks/useAuthContext";
import { useUserContext } from "./hooks/useUserContext";

const App = () => {
  const { auth } = useAuthContext();
  const { user } = useUserContext();
  return (
    <>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!(user && auth) ? <Login /> : <Navigate to="/myPosts" />}
        />
        <Route
          path="/signup"
          element={!auth ? <SignUp /> : <Navigate to="/myPosts" />}
        />
        <Route
          path="/myPosts"
          element={auth ? <MyPosts /> : <Navigate to="/login" />}
        />
        <Route
          path="/friends"
          element={auth ? <Friends /> : <Navigate to="/login" />}
        />
        <Route
          path="/feeds"
          element={auth ? <Feeds /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={auth ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={auth ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:id"
          element={auth ? <AnotherUser /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
