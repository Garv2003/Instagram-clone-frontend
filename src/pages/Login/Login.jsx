import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect } from "react";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Icon } from "../../utils/iconutitls";
import { RotatingLines } from "react-loader-spinner";
import PropType from "prop-types";
import UseLogin from "../../Hooks/UseLogin";
function Login({ setProgress }) {
  const {
    username,
    password,
    setUsername,
    setPassword,
    showPassword,
    changeVisibility,
    passwordhidden,
    loading,
    handleLogin,
  } = UseLogin(setProgress);

  useEffect(() => {
    setProgress(100);
    document.title = "Instagram Login";
  }, [setProgress]);

  return (
    <div className="login">
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
                type="password"
                ref={passwordhidden}
                placeholder="Password"
                autoComplete="on"
              />
              <div className="eye" onClick={() => changeVisibility()}>
                {showPassword ? (
                  <Icon
                    name="MdVisibilityOff"
                    style={{
                      color: "black",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <Icon
                    name="MdVisibility"
                    style={{
                      color: "grey",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
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
            Don&apos;t have an account?{" "}
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="footer">
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setProgress: PropType.func,
};

export default Login;
