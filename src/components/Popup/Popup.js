import React from "react";
import "./Popup.css";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
const Popup = ({ Open, onClose }) => {
  if (!Open) {
    return null;
  }
  const navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div className="Popup" onClick={onClose}>
      <div >
        <div className="popup1">
          <Link to="/accounts/edit/" className="popup_items">
            <SettingsIcon />
            Setting
          </Link>
          <Link to="/your_activity/interactions/likes/" className="popup_items">
            <AccessTimeOutlinedIcon />
            Your activity
          </Link>
          <Link to="/profile/saved" className="popup_items">
            <BookmarkBorderIcon />
            Saved
          </Link>
          <button className="popup_items">
            <ModeNightOutlinedIcon />
            Switch appearance
          </button>
          <Link className="popup_items">
            <AssignmentLateOutlinedIcon />
            Report a Problem
          </Link>
        </div>
        <div className="popup2">
          <div className="popup_items">Switch accounts</div>
          <div className="popup_items " onClick={handlelogout}>Log out</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
