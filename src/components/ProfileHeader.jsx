import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Settingpopup from "./Settingpopup";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import PropType from "prop-types";
import { UseAuth } from "../Context/Auth/AuthContext";
import LazyLoad from "react-lazy-load";
import { Icon } from "../utils/iconutitls";

const ProfileHeader = ({ User, length, followers, following }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [onsetting, setOnsetting] = useState(false);
  const [profileImage, setProfileImage] = useState(User.profileImage);
  const [loading, setLoading] = useState(false);
  const hiddenInput = useRef(null);
  const { info, setInfo } = UseAuth();

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
    if (!file) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/addprofilephoto`,
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
      info.profileImage = res.data;
      setInfo(info);
      setLoading(false);
      toast.success("Profile Photo Upload Successfully", {
        theme: "dark",
      });
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
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/deleteprofilephoto`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setLoading(false);
      setProfileImage("");
      info.profileImage = "";
      setInfo(info);
      toast.success("Profile Photo Removed Successfully", {
        theme: "dark",
      });
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProfilePhotoPopup = () => {
    return (
      <div className={`ProfilePopup ${showPopup ? "show" : ""}`}>
        <div className="popupprofile">
          <div className="popupprofile_item1">Change Profile Photo</div>
        </div>
        <div className="popupprofile_item popupprofile bel" onClick={onAvatar}>
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
    );
  };

  return (
    <>
      <header>
        <div className="header-wrap">
          <input
            type="file"
            ref={hiddenInput}
            name="ImageUrl"
            onChange={uploading}
            style={{ display: "none" }}
          />
          {removeProfilePhotoPopup()}
          <div
            className={`overlay ${showPopup ? "open" : ""}`}
            onClick={() => setShowPopup(!showPopup)}
          ></div>
          <div className="profile-pic">
            <div className="profileloader">
              {profileImage ? (
                <LazyLoad>
                  <img onClick={onPhoto} src={profileImage} alt="profile" />
                </LazyLoad>
              ) : (
                <button className="photobtn" disabled={loading}>
                  <Icon
                    name="IoPersonCircleSharp"
                    className="profile_header_avatar"
                    onClick={onAvatar}
                  />
                </button>
              )}
              {loading && (
                <div className="proloader">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RotatingLines
                      strokeColor="#fafafa"
                      strokeWidth="4"
                      height="80"
                      width="80"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile-info">
            <div className="title row">
              <h2>{User.username}</h2>
              <span className="verfied-icon"></span>
              <div className="btn_group">
                <button
                  className="btn"
                  onClick={() => navigate("/accounts/edit")}
                >
                  Edit profile
                </button>
                <button
                  className="btn"
                  onClick={() => navigate("/archive/stories")}
                >
                  View Archive
                </button>
              </div>
              <div
                className="btnsetting"
                onClick={() => setOnsetting(!onsetting)}
              >
                <Settingpopup
                  onClose={() => {
                    setOnsetting(false);
                  }}
                  open={onsetting}
                />
                <Icon
                  name="IoIosSettings"
                  className="btnset"
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                />
              </div>
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
                <h1>{User.name}</h1>
                {/* <span>
                  Everyone has a story to tell.
                  <br />
                  Tag <a>#ShotoniPhone</a> to take part.
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info mobile-only">
          <div className="descriptions row">
            <h1>{User.name}</h1>
            {/* <span>
              Everyone has a story to tell.
              <br />
              Tag <a>#ShotoniPhone</a> to take part.
            </span> */}
          </div>
        </div>
      </header>
    </>
  );
};

ProfileHeader.propTypes = {
  User: PropType.object.isRequired,
  length: PropType.number.isRequired,
  followers: PropType.number.isRequired,
  following: PropType.number.isRequired,
};

export default ProfileHeader;
