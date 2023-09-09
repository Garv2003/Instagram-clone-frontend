import React from "react";
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
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)"
        progress={progress}
        height={3}
        // onLoaderFinished={() => console.log("finished")}
      />
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login setProgress={setProgress} />}
        ></Route>
        <Route
          path="/signup"
          element={<SignUp setProgress={setProgress} />}
        ></Route>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Home setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/profile/*"
          element={
            localStorage.getItem("token") ? (
              <Profile setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/explore"
          element={
            localStorage.getItem("token") ? (
              <Explore setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/reels"
          element={
            localStorage.getItem("token") ? (
              <Reels setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/showpost/:id"
          element={
            localStorage.getItem("token") ? (
              <Showpost setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/create"
          element={
            localStorage.getItem("token") ? (
              <Create setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/message"
          element={
            localStorage.getItem("token") ? (
              <Messages setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/archive/stories/"
          element={
            localStorage.getItem("token") ? (
              <Archive setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/accounts/edit"
          element={
            localStorage.getItem("token") ? (
              <Setting setProgress={setProgress} />
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
              <Notifications setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/search"
          element={
            localStorage.getItem("token") ? (
              <Search setProgress={setProgress} />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/showprofile/:id"
          element={
            localStorage.getItem("token") ? (
              <Showprofile setProgress={setProgress} />
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
