import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

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
          <div className="setting_popup">
            <Link to="/accounts/edit" className="settingpopup_items">
              App and Websites
            </Link>
            <hr
              style={{
                width: "100%",
                margin: "0px",
                border: "1px solid rgb(54,54,54)",
              }}
            />
            <Link to="/accounts/edit" className="settingpopup_items">
              Qr Code
            </Link>
            <hr
              style={{
                width: "100%",
                margin: "0px",
                border: "1px solid rgb(54,54,54)",
              }}
            />
            <Link to="/notifications" className="settingpopup_items">
              Notifications
            </Link>

            <hr
              style={{
                width: "100%",
                margin: "0px",
                border: "1px solid rgb(54,54,54)",
              }}
            />
            <Link to="/settings" className="settingpopup_items">
              Settings and Privacy
            </Link>
            <hr
              style={{
                width: "100%",
                margin: "0px",
                border: "1px solid rgb(54,54,54)",
              }}
            />
            <div className="settingpopup_items" onClick={handleLogout}>
              Log Out
            </div>
            <hr
              style={{
                width: "100%",
                margin: "0px",
                border: "1px solid rgb(54,54,54)",
              }}
            />
            <div className="settingpopup_items" onClick={onClose}>
              Cancel
            </div>
          </div>
        </>
      )}
    </>
  );
};

Settingpopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Settingpopup;
