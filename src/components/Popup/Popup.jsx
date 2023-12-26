import "./Popup.css";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popup = ({ Open, onClose }) => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    showToast("Logout Successfully");
    window.location.assign("/login");
  };

  const showToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="overlaypo" onClick={onClose} />
      <div className="Popup" onClick={onClose}>
        <div>
          <div className="popup1">
            <Link to="/accounts/edit/">
              <button className="popup_items">
                <SettingsIcon />
                <span>Setting</span>
              </button>
            </Link>
            <Link to="/your_activity/interactions/likes/">
              <button className="popup_items">
                <AccessTimeOutlinedIcon />
                <span>Your activity</span>
              </button>
            </Link>
            <Link to="/profile/saved">
              <button className="popup_items">
                <BookmarkBorderIcon />
                Saved
              </button>
            </Link>
            <button className="popup_items">
              <ModeNightOutlinedIcon
                sx={{
                  transform: "rotate(45deg)",
                }}
              />
              Switch appearance
            </button>
          </div>
          <div className="popup2">
            <div className="popup_items">Switch accounts</div>
            <div className="popup_items " onClick={handlelogout}>
              Log out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
