import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "react-toastify/dist/ReactToastify.css";

function Signup({ setProgress }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordhidden = useRef(null);
  const confirmpasswordhidden = useRef(null);

  const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    setProgress(100);
    if (showPassword) {
      passwordhidden.current.type = "text";
      confirmpasswordhidden.current.type = "text";
    } else {
      passwordhidden.current.type = "password";
      confirmpasswordhidden.current.type = "password";
    }
  }, [setProgress, passwordhidden, confirmpasswordhidden]);

  function changeVisibility() {
    if (passwordhidden.current.type === "password") {
      passwordhidden.current.type = "text";
      confirmpasswordhidden.current.type = "text";
      setShowPassword(true);
    } else {
      passwordhidden.current.type = "password";
      confirmpasswordhidden.current.type = "password";
      setShowPassword(false);
    }
  }

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !name || !email) {
      toast.error("Please fill all the fields", {
        theme: "dark",
      });
      return;
    } else if (password !== confirmpassword) {
      toast.error("Passwords do not match", {
        theme: "dark",
      });
      return;
    }
    const data = { username, name, password, email };
    console.log(data);
    setPassword("");
    setUsername("");
    setemail("");
    setname("");
    try {
      await axios
        .post(`${API_URL}/auth/register`, {
          data,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: "dark",
            });
            navigate("/login");
          } else {
            toast.error(res.data.message, {
              theme: "dark",
            });
          }
        });
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
                type="password"
                ref={passwordhidden}
                placeholder="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility();
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
                type="password"
                placeholder="confirm password"
                ref={confirmpasswordhidden}
                className="login-input"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility();
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

export default Signup;
