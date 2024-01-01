import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
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

const App = () => {
  const [progress, setProgress] = useState(0);
  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <LoadingBar
        color="#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)"
        progress={progress}
        height={3}
      />
      <Routes>
        <Route
          exact
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" />
            ) : (
              <Login setProgress={setProgress} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" />
            ) : (
              <SignUp setProgress={setProgress} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Home setProgress={setProgress} />} />
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute element={<Profile setProgress={setProgress} />} />
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute element={<Explore setProgress={setProgress} />} />
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute element={<Reels setProgress={setProgress} />} />
          }
        />
        <Route
          path="/p/:id/"
          element={
            <ProtectedRoute element={<Showpost setProgress={setProgress} />} />
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute element={<Create setProgress={setProgress} />} />
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute element={<Messages setProgress={setProgress} />} />
          }
        />
        <Route
          path="/archive/stories/"
          element={
            <ProtectedRoute element={<Archive setProgress={setProgress} />} />
          }
        />
        <Route
          path="/accounts/edit"
          element={
            <ProtectedRoute element={<Setting setProgress={setProgress} />} />
          }
        />
        <Route path="/updatepost" />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              element={<Notifications setProgress={setProgress} />}
            />
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute element={<Search setProgress={setProgress} />} />
          }
        />
        <Route
          path="/sp/:id/*"
          element={
            <ProtectedRoute
              element={<Showprofile setProgress={setProgress} />}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
