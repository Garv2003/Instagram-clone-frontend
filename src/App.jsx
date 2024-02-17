import { useState, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const Home = lazy(() => import("./pages/Home"));
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup";
const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));
const Reels = lazy(() => import("./pages/Reels"));
const Showpost = lazy(() => import("./pages/Showpost"));
const Create = lazy(() => import("./pages/Create"));
const Messages = lazy(() => import("./pages/Messages"));
const Archive = lazy(() => import("./pages/Archive"));
const Setting = lazy(() => import("./pages/Setting"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Search = lazy(() => import("./pages/Search"));
const Showprofile = lazy(() => import("./pages/Showprofile"));
import Proptype from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo.png";

const App = () => {
  const [progress, setProgress] = useState(0);
  const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  ProtectedRoute.propTypes = {
    element: Proptype.element.isRequired,
  };

  const LoadingPage = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={logo}
            alt="Instagram"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <TailSpin
            visible={true}
            height="30"
            width="30"
            color="#afafaf"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingBar
        color="#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)"
        progress={progress}
        height={3}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Login setProgress={setProgress} />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoadingPage />}>
              <SignUp setProgress={setProgress} />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Home setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Profile setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Explore setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Reels setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/p/:id/"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Showpost setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Create setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Messages setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/archive/stories/"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Archive setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/accounts/edit"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Setting setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route path="/updatepost" />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Notifications setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Search setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/sp/:id/*"
          element={
            <ProtectedRoute
              element={
                <Suspense fallback={<LoadingPage />}>
                  <Showprofile setProgress={setProgress} />
                </Suspense>
              }
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
