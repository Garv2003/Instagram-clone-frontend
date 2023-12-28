import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

function Login({ setProgress }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    setProgress(20);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      if (!response.data.success) {
        setProgress(50);
        toast.error(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setProgress(100);
        return;
      }

      setProgress(70);
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark"
      });

      setProgress(100);
      setTimeout(() => {
        localStorage.setItem("token", response.data.token);
        window.location.assign("/profile");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin"></div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone number, username, or email"
              />
            </div>
            <div className="field">
              <input
                id="password"
                value={password}
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="on"
              />
              <div
                className="eye"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <VisibilityIcon
                  sx={{ color: showPassword ? "black" : "gray", fontSize: 20 }}
                />
              </div>
            </div>
            <button className="login-button" type="submit" title="Login">
              Log In
            </button>
            <div className="separator">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <div className="other">
              <button className="fb-login-btn" type="button">
                <i className="fa fa-facebook-official fb-icon"></i>
                <span className="facebooklogin">Log in with Facebook</span>
              </button>
              <Link className="forgot-password" to="">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <div className="box1">
          <p>
            Don't have an account?{" "}
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="footer">
          <ProfileFooter />
        </div>
      </div>
    </>
  );
}

export default Login;
