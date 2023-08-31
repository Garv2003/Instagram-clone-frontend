import React, { useState, useRef, useEffect } from "react";
import "./ProfileHeader.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Settingpopup from "../Settingpopup/Settingpopup";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const ProfileHeader = ({ User, length, followers, following }) => {
  const [user, setuser] = useState(User);
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [profileImage, setprofileImage] = useState("");
  const hiddeninput = useRef(null);

  const onphoto = (e) => {
    if (!showpopup) {
      setshowpopup(true);
    } else {
      setshowpopup(false);
    }
  };

  useEffect(() => {
    setuser(User);
    setprofileImage(User.profileImage);
  }, [User]);

  const uploading = async (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    await axios({
      method: "Post",
      url: URL("/post/addprofilephoto"),
      data: {
        ImageUrl: file,
        id: token,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setprofileImage(res.data);
    });
  };

  const onavatar = () => {
    hiddeninput.current.click();
    setshowpopup(false);
  };

  const Remove = async () => {
    await axios
      .post(URL("/post/deleteporfilephoto"), {
        id: localStorage.getItem("token"),
      })
      .then(() => {
        setprofileImage("");
        setshowpopup(false);
      });
  };

  return (
    <div className="profile_header">
      <input
        type="file"
        ref={hiddeninput}
        name="ImageUrl"
        onChange={uploading}
        style={{ display: "none" }}
      />
      <div className="profile_header_left">
        {showpopup ? (
          // <Profilepopup
          //   Open={showpopup}
          //   onClose={() => {
          //     setshowpopup(false);
          //   }}
          //   remove={Remove}
          //   onavatar={onavatar}
          // />
          <div className="Profileppopup">
            <div className="popupprofile">
              <div className="profilepopup_item1">Change Profile Photo</div>
            </div>
            <div className="popupprofile">
              <button className="profilepopup_item bel" onClick={onavatar}>
                Upload Photo
              </button>
            </div>
            <div className="popupprofile">
              <button className="profilepopup_item rel" onClick={Remove}>
                Remove Current Photo
              </button>
            </div>
            <div>
              <button
                className="profilepopup_item"
                onClick={() => {
                  setshowpopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        {profileImage ? (
          <img
            className="profile_header_avatar"
            onClick={onphoto}
            src={profileImage}
            alt="profile"
          />
        ) : (
          <button className="photobtn">
            <Avatar
              className="profile_header_avatar"
              onClick={onavatar}
              style={{ width: "150px", height: "150px", margin: "40px" }}
            ></Avatar>
          </button>
        )}
      </div>
      <div className="profile_header_right">
        <div className="profile_header_icon">
          <div className="profile_icon">
            <span>{User.username}</span>
            <button
              className="btn"
              onClick={() => {
                navigate("/accounts/edit");
              }}
            >
              Edit profile
            </button>
            <button className="btn">
              <Link to="/archive/stories/" className="Linkcolor">
                View Archive
              </Link>
            </button>
            <button
              onClick={() => {
                if (!open) {
                  setopen(true);
                } else {
                  setopen(false);
                }
              }}
              className="btnsetting"
            >
              {open ? <Settingpopup Onclose={onphoto} /> : null}
              <SettingsIcon />
            </button>
          </div>
          <div className="profile_icon">
            <span>{length} post</span>
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
