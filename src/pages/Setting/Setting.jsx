import "./Setting.css";
import React from "react";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import PropType from "prop-types";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-toastify";

const Setting = ({ setProgress }) => {
  React.useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.assign("/login");
    }, 1000);
  };
  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <div className="setting">
          <div className="setting_header">
            <h1 className="setting_title">Settings and Privacy</h1>
          </div>
          <div>
            <div className="">
              <div>Your Account</div>
              <div>Privacy</div>
            </div>
            <div>Account Centre</div>
            <div>Password,security,personal details,ads</div>
          </div>
          <div className="setting_item">
            <div>How you used Instagram</div>
            <div>Saved</div>
            <div>Archive</div>
            <div>Your Activity</div>
            <div>Close friends</div>
            <div>Notifications</div>
            <div>Time Spent</div>
          </div>
          <div>
            <div>What you use</div>
            <div>Favourities</div>
            <div>Muted accounts</div>
            <div>Suggested content</div>
            <div>Like and share counts</div>
          </div>
          <div className="setting_item_info">
            <div>More info and support</div>
            <div>Help</div>
            <div>Account Status</div>
            <div>About</div>
          </div>
          <div className="setting_item_login">
            <div>Login</div>
            <div>Add account</div>
            <div
              onClick={() => {
                Logout();
              }}
            >
              Log out
            </div>
          </div>
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Setting;
