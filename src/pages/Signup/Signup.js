import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Signup.module.css'
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const URL = (mypath) => {
    return `http://localhost:3456${mypath}`;
  };
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, name, password, email };
    console.log(data);
    setPassword("");
    setUsername("");
    setemail("");
    setname("");
    try {
      const response = await axios.post(URL("/auth/register"), {
       data
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
            <label for="full name" className="login-label">Full Name</label>
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
            <label for="username" className="login-label">Username</label>
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
            <label for="username" className="login-label">Email</label>
          </div>
          <div className="field">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="password" className="login-label">Password</label>
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
  );
}

export default Register;
