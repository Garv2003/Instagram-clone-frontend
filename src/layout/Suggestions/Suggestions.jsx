import React from "react";
import { Link } from "react-router-dom";
import Profilebar from "../../components/ProfileBar/ProfileBar";
import "./Suggestions.css";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
import { RotatingLines } from "react-loader-spinner";
import { IoPersonCircleSharp } from "react-icons/io5";

function Suggestions(props) {
  const { user } = props;
  const { info } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    if (username === info.username) {
      toast.error("You are already logged in");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      setLoading(true);
      if (!response.data.success) {
        toast.error(response.data.msg, {
          theme: "dark",
        });
        setLoading(false);
        return;
      }
      toast.success("Login Success", {
        theme: "dark",
      });
      setLoading(false);
      setTimeout(() => {
        localStorage.setItem("token", response.data.token);
        window.location.assign("/profile");
      }, 500);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while logging in.", {
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {open && (
        <>
          <div className="overlayst" onClick={handleClose}></div>
          <div className="Login_Popup">
            <RxCross2 className="close" onClick={handleClose} />
            <div className="Login_Header">
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
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                  />
                </div>
                <button
                  className="login-button"
                  type="submit"
                  title="Login"
                  disabled={loading}
                >
                  {loading ? (
                    <RotatingLines strokeColor="#fff" height={15} width={15} />
                  ) : (
                    "Log In"
                  )}
                </button>
                <div className="other">
                  <Link className="forgot-password" to="">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="suggestions">
        <div className="userbar">
          <div className="suggestions__username">
            <div className="username__left">
              <Link to="/profile" className="avatar cl">
                {info.profileImage ? (
                  <img
                    className="postprofileimage"
                    src={info.profileImage}
                    alt="profile"
                  />
                ) : (
                  <IoPersonCircleSharp
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Link>
              <div className="username__info">
                <Link to="/profile" className="username cl">
                  {info.username}
                </Link>
              </div>
            </div>
            <button
              className="follow__button"
              style={{
                paddingBottom: "0.5rem",
              }}
              onClick={handleOpen}
            >
              Switch
            </button>
          </div>
        </div>
        <div className="suggestions__title">
          <div>Suggestions for you</div>
          <Link to="/notifications" className="seeall">
            See All
          </Link>
        </div>
        <div className="suggestions__usernames">
          <div className="usersuggestions">
            {user.slice(0, 6).map((post) => (
              <Profilebar post={post} key={post._id} />
            ))}
          </div>
        </div>
        <div className="suggestion_footer">
          <div className="suggestion_icons">
            <div>About</div>.<div>Help</div>.<div>Press</div>.<div>API</div>.
            <div>Jobs</div>.<div>Privacy</div>.<div>Terms</div>.
            <div>Locations</div>.<div>Language</div>.<div>English</div>.
            <div>Meta Verified</div>
          </div>
          <div>© 2023 INSTAGRAM FROM META</div>
        </div>
      </div>
    </>
  );
}

export default Suggestions;
