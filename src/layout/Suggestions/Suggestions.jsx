import { useState } from "react";
import { Link } from "react-router-dom";
import Profilebar from "../../components/ProfileBar";
import { Icon } from "../../utils/iconutitls";
import { RotatingLines } from "react-loader-spinner";
import PropType from "prop-types";
import UseLogin from "../../Hooks/UseLogin";
import { UseAuth } from "../../Context/Auth/AuthContext";

function Suggestions(props) {
  const { info } = UseAuth();
  const { user, setProgress } = props;
  const [open, setOpen] = useState(false);
  const { username, password, setUsername, setPassword, loading, handleLogin } =
    UseLogin(setProgress);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {open && (
        <>
          <div className="overlayst" onClick={handleClose}></div>
          <div className="Login_Popup">
            <Icon name="RxCross2" className="close" onClick={handleClose} />
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
                  <Icon
                    name="IoPersonCircleSharp"
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
            {user.slice(0, 5).map((post) => (
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

Suggestions.propTypes = {
  user: PropType.array,
  setProgress: PropType.func,
};

export default Suggestions;
