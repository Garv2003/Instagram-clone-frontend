import { Link } from "react-router-dom";
import "./Login/Login.css";
import { useEffect } from "react";
import { Icon } from "../utils/iconutitls";

import { RotatingLines } from "react-loader-spinner";
import PropType from "prop-types";
import UseLogin from "../Hooks/UseLogin";

function Signup({ setProgress }) {
  const {
    username,
    password,
    name,
    email,
    confirmpassword,
    setUsername,
    setPassword,
    setname,
    setemail,
    setConfirmPassword,
    showPassword,
    changeVisibility,
    passwordhidden,
    confirmpasswordhidden,
    changeVisibility2,
    loading,
    handleRegister,
    showPassword2,
  } = UseLogin(setProgress);

  useEffect(() => {
    setProgress(100);
    document.title = "Instagram Sign up";
  }, [setProgress]);

  return (
    <div className="login">
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
                placeholder="Password"
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
            <div className="field">
              <input
                id="confirm password"
                type="password"
                placeholder="Confirm Password"
                ref={confirmpasswordhidden}
                className="login-input"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility2();
                }}
              >
                {showPassword2 ? (
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
              {/* <label for="password" className="login-label">
              Confirm Password
            </label> */}
            </div>
            <button className="login-button" title="login" disabled={loading}>
              {loading ? (
                <RotatingLines strokeColor="#fff" height={15} width={15} />
              ) : (
                "Sign Up"
              )}
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
    </div>
  );
}

Signup.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Signup;
