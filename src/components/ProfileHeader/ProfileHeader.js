import React, { useState, useRef, useEffect } from "react";
import "./ProfileHeader.css";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import Settingpopup from "../Settingpopup/Settingpopup";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const ProfileHeader = ({ User, length, followers, following }) => {
  const [user, setuser] = useState(User);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(User.profileImage);
  const hiddenInput = useRef(null);

  useEffect(() => {
    setuser(User);
    setProfileImage(User.profileImage);
  }, [User]);

  const onPhoto = () => {
    if (!showPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const uploading = async (e) => {
    console.log(e.target.files[0]);
    console.log("uploading");
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    try {
      const res = await axios.post(
        URL("/post/addprofilephoto"),
        {
          ImageUrl: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setProfileImage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAvatar = () => {
    hiddenInput.current.click();
    setShowPopup(false);

  };

  const removeProfilePhoto = async () => {
    console.log("remove");
    try {
      await axios.delete(URL("/post/deleteprofilephoto"), {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setProfileImage("");
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile_header">
      <input
        type="file"
        ref={hiddenInput}
        name="ImageUrl"
        onChange={uploading}
        style={{ display: "none" }}
      />
      <div className="profile_header_left">
        {showPopup && (
          <div className="ProfilePopup">
            <div className="popupprofile">
              <div className="popupprofile_item1">Change Profile Photo</div>
            </div>
            <div
              className="popupprofile_item popupprofile bel"
              onClick={onAvatar}
            >
              Upload Photo
            </div>
            <div
              className="popupprofile_item rel popupprofile"
              onClick={removeProfilePhoto}
            >
              Remove Current Photo
            </div>
            <button
              className="popupprofile_item"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        )}
        {profileImage ? (
          <img
            className="profile_header_avatar"
            onClick={onPhoto}
            src={profileImage}
            alt="profile"
          />
        ) : (
          <button className="photobtn">
            <Avatar
              className="profile_header_avatar"
              onClick={onAvatar}
              style={{ width: "150px", height: "150px", margin: "40px" }}
            ></Avatar>
          </button>
        )}
      </div>
      <div className="profile_header_right">
        <div className="profile_header_icon">
          <div className="profile_icon">
            <span>{User.username}</span>
            <button className="btn" onClick={() => navigate("/accounts/edit")}>
              Edit profile
            </button>
            <button
              className="btn"
              onClick={() => navigate("/archive/stories")}
            >
              View Archive
            </button>
            <button className="btnsetting" onClick={() => setOpen(!open)}>
              {open && <Settingpopup onClose={onPhoto} />}
              <SettingsIcon />
            </button>
          </div>
          <div className="profile_icon">
            <span>{length} posts</span>
            <span> {followers} followers </span>
            <span> {following} following</span>
          </div>
          <div className="profile_icon">{User.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
