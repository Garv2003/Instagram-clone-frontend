import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
function Login({ Onlogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await axios.post(URL("/auth/login"), { username, password });
      console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      localStorage.setItem("token",response.data.user._id)
      window.location.assign("/profile");
    } catch (error) {
      console.error(error);
    }
  };
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      if (token) {
        const { userId } = token;
        setUserId(userId);
      }
      else{
        navigate("/login");
      }
    } catch (error) {}
  }, []);

  return (
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
            <label className="login-label" htmlFor="username">Phone number, username, or email</label>
          </div>
          <div className="field">
            <input
              id="password"
              value={password}
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <label className="login-label" htmlFor="password">Password</label>
          </div>
          <button className="login-button" type="submit" title="login">
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
              <span className="">Log in with Facebook</span>
            </button>
            <a className="forgot-password" href="#">
              Forgot password?
            </a>
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
    </div>
  );
}

export default Login;
