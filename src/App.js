import React, { useState } from "react";
import "./App.css";
import Explore from "./pages/Explore/Explore";
import Reels from "./pages/Reels/Reels";
import Showpost from "./pages/Showpost/Showpost";
import Create from "./pages/Create/Create";
import Messages from "./pages/Messages/Messages";
import Archive from "./pages/Archive/Archive";
import Setting from "./pages/Setting/Setting";
import Notifications from "./pages/Notifications/Notifications";
import Search from "./pages/Search/Search";
import Showprofile from "./pages/Showprofile/Showprofile";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? <Home /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/profile/*"
          element={
            localStorage.getItem("token") ? (
              <Profile />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/explore"
          element={
            localStorage.getItem("token") ? (
              <Explore />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/reels"
          element={
            localStorage.getItem("token") ? <Reels /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/showpost/:id"
          element={
            localStorage.getItem("token") ? (
              <Showpost />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/create"
          element={
            localStorage.getItem("token") ? (
              <Create />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/message"
          element={
            localStorage.getItem("token") ? (
              <Messages />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/archive/stories/"
          element={
            localStorage.getItem("token") ? (
              <Archive />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/accounts/edit"
          element={
            localStorage.getItem("token") ? (
              <Setting />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route path="/updatepost"></Route>
        <Route
          path="/notifications"
          element={
            localStorage.getItem("token") ? (
              <Notifications />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/search"
          element={
            localStorage.getItem("token") ? (
              <Search />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/showprofile/:id"
          element={
            localStorage.getItem("token") ? (
              <Showprofile />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
