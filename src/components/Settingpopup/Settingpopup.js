import React from "react";
import "./Settingpopup.css";
import { Link, useNavigate } from "react-router-dom";
const Settingpopup = ({ openpop,Onclose }) => {
  if (!openpop) {
    return null;
  }
  const navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div className="settingpopup">
      <div >
        <div className="popup1">
          <Link to="/accounts/edit/" className="settingpopup_items">
           App and Websites
          </Link>
          <Link to="/notifications" className="settingpopup_items">
            Notifications
          </Link>
          <Link to="/accounts/edit/" className="settingpopup_items">
            Settings and Privacy
          </Link>
          <button className="settingpopup_items" onClick={handlelogout}>
            Log Out 
          </button>
          <button className="settingpopup_items" onClick={Onclose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settingpopup;
