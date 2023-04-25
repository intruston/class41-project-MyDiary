import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPosts from "./pages/MyPosts/MyPosts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Friends from "./pages/Friends/Friends";
import Feeds from "./pages/Feeds/Feeds";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";
import AnotherUser from "./pages/AnotherUser/AnotherUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user/:id" element={<AnotherUser />} />
      </Routes>
    </>
  );
};

export default App;
