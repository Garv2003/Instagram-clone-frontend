import React, { useState, useRef, useEffect } from "react";
import "./ProfileHeader.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import Settingpopup from "../Settingpopup/Settingpopup";
import axios from "axios";
import PostLoader from "../PostLoader/PostLoader";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

const ProfileHeader = ({ User, length, followers, following }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(User.profileImage);
  const [loading, setLoading] = useState(false);
  const hiddenInput = useRef(null);
  useEffect(() => {
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
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/post/addprofilephoto`,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onAvatar = () => {
    hiddenInput.current.click();
    setShowPopup(false);
  };

  const removeProfilePhoto = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/post/deleteprofilephoto`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setLoading(false);
      setProfileImage("");
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="header">
    //     <div className="profile_header">
    //     <input
    //       type="file"
    //       ref={hiddenInput}
    //       name="ImageUrl"
    //       onChange={uploading}
    //       style={{ display: "none" }}
    //     />

    //     <div className="profile_header_left">
    //       <div className={`ProfilePopup ${showPopup ? "active" : ""}`}>
    //         <div className="popupprofile">
    //           <div className="popupprofile_item1">Change Profile Photo</div>
    //         </div>
    //         <div
    //           className="popupprofile_item popupprofile bel"
    //           onClick={onAvatar}
    //         >
    //           Upload Photo
    //         </div>
    //         <div
    //           className="popupprofile_item rel popupprofile"
    //           onClick={removeProfilePhoto}
    //         >
    //           Remove Current Photo
    //         </div>
    //         <button
    //           className="popupprofile_item"
    //           onClick={() => setShowPopup(false)}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //       <div
    //         className={`overlay ${showPopup ? "open" : ""}`}
    //         onClick={() => setShowPopup(!showPopup)}
    //       ></div>
    //       <div className="profileloader">
    //         {profileImage ? (
    //           <img
    //             className="profile_header_avatar"
    //             onClick={onPhoto}
    //             src={profileImage}
    //             alt="profile"
    //           />
    //         ) : (
    //           <button className="photobtn">
    //             <Avatar
    //               className="profile_header_avatar"
    //               onClick={onAvatar}
    //               style={{ width: "150px", height: "150px", margin: "40px" }}
    //             ></Avatar>
    //           </button>
    //         )}
    //         {loading && (
    //           <div className="proloader">
    //             <PostLoader />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="profile_header_right">
    //       <div className="profile_header_icon">
    //         <div className="profile_icon">
    //           <span>{User.username}</span>
    //           <button className="btn" onClick={() => navigate("/accounts/edit")}>
    //             Edit profile
    //           </button>
    //           <button
    //             className="btn"
    //             onClick={() => navigate("/archive/stories")}
    //           >
    //             View Archive
    //           </button>
    //           <button className="btnsetting" onClick={() => setOpen(!open)}>
    //             <Settingpopup onClose={onPhoto} open={open} />
    //             <SettingsIcon />
    //           </button>
    //         </div>
    //         <div className="profile_icon">
    //           <span>{length} posts</span>
    //           <span> {followers} followers </span>
    //           <span> {following} following</span>
    //         </div>
    //         <div className="profile_icon">{User.name}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <header>
        <div className="header-wrap">
          <div className="profile-pic">
            <img src="/images/profile-logo.jpg" alt="profile-logo" />
          </div>
          <div className="profile-info">
            <div className="title row">
              <h2>apple</h2>
              <span className="verfied-icon"></span>
              <button className="primary">Follow</button>
              <button className="secondary">Message</button>
              <button className="secondary">
                <SettingsIcon />
              </button>
            </div>
            <div className="desktop-only">
              <div className="details row">
                <ul>
                  <li>
                    <span>{length}</span> posts
                  </li>
                  <li>
                    <span>{followers}</span> followers
                  </li>
                  <li>
                    <span>{following}</span> following
                  </li>
                </ul>
              </div>
              <div className="descriptions row last">
                <h1>apple</h1>
                <span>
                  Everyone has a story to tell.
                  <br />
                  Tag <a>#ShotoniPhone</a> to take part.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info mobile-only">
          <div className="descriptions row">
            <h1>apple</h1>
            <span>
              Everyone has a story to tell.
              <br />
              Tag <a>#ShotoniPhone</a> to take part.
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
