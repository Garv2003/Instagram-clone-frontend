import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "react-toastify/dist/ReactToastify.css";

function Register({ setProgress }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setProgress(100);
  }, []);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !name || !email) {
      toast.error("Please fill all the fields");
      return;
    } else if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = { username, name, password, email };
    console.log(data);
    setPassword("");
    setUsername("");
    setemail("");
    setname("");
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        data,
      });
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin"></div>
          <form className="login-form" onSubmit={handleRegister}>
            <div className="field">
              <input
                id="fullname"
                type="name"
                value={name}
                className="login-input"
                onChange={(e) => setname(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div className="field">
              <input
                id="username"
                type="name"
                value={username}
                className="login-input"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="field">
              <input
                id="email"
                type="name"
                value={email}
                className="login-input"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="field">
              <input
                id="confirm password"
                type={showPassword ? "text" : "password"}
                placeholder="confirm password"
                className="login-input"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {/* <label for="password" className="login-label">
              Confirm Password
            </label> */}
            </div>
            <button className="login-button" title="login">
              Sign Up
            </button>
          </form>
          <div className="separator">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>
          <div className="hother">
            Sign up to see photos and videos from your friends.
          </div>
          <div className="other">
            <button className="fb-login-btn" type="button">
              <i className="fa fa-facebook-official fb-icon"></i>
              <span className="">Log in with Facebook</span>
            </button>
          </div>
        </div>
        <div className="box1">
          <p>
            Have an account?{" "}
            <Link className="signup" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
