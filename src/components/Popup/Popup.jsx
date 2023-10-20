import React from "react";
import "./Popup.css";
import { Link} from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popup = ({ Open, onClose }) => {
  const navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("token")
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
    navigate("/login")
  }

  return (
    <>
    <div className="overlaypo" onClick={onClose}/>
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
          {/* <Link className="popup_items">
            <AssignmentLateOutlinedIcon />
            Report a Problem
          </Link> */}
        </div>
        <div className="popup2">
          <div className="popup_items">Switch accounts</div>
          <div className="popup_items " onClick={handlelogout}>Log out</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Popup;
