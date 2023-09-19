import React from "react";
import "./Settingpopup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settingpopup = ({ onClose, open }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  return (
    <>
      {open && (
        <>
          <div className="overlayst"></div>
          <div className="popup">
            <Link to="/accounts/edit" className="settingpopup_items">
              App and Websites
            </Link>
            <Link to="/notifications" className="settingpopup_items">
              Notifications
            </Link>
            <Link to="/settings" className="settingpopup_items">
              Settings and Privacy
            </Link>
            <button className="settingpopup_items" onClick={handleLogout}>
              Log Out
            </button>
            <button className="settingpopup_items" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Settingpopup;
