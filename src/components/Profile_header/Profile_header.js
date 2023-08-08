import React, { useState, useRef, useEffect } from "react";
import "./Profile_header.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Settingpopup from "../Settingpopup/Settingpopup";
import Profilepopup from "../Profilepopup/Profilepopup";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profile_header = ({ User, length, followers, following }) => {
  const [user, setuser] = useState({ User });
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [ImageUrl, setImageUrl] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const hiddeninput = useRef(null);
  const onphoto = (e) => {
    if (!showpopup) {
      setshowpopup(true);
    } else {
      setshowpopup(false);
    }
  };
  useEffect(() => {
    setuser(User)
    if (ImageUrl) {
      uploading();
    }
  });
  const uploading = async () => {
    const token=localStorage.getItem('token')
    await axios({
      method: "Post",
      url: URL("/post/addprofilephoto"),
      data: {
        ImageUrl: ImageUrl,
        id:token
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(res.data);
      user.profileImage = res.data;
    });
  };
  const onavatar = (e) => {
    hiddeninput.current.click();
  };
  const Upload = () => {};
  const Remove = async () => {
    await axios.post(URL("/post/deleteporfilephoto"),{id:localStorage.getItem("token")}).then(() => {
      user.profileImage = "";
      setshowpopup(false);
    });
  };
  return (
    <div className="profile_header">
      <div className="profile_header_left">
        {user.profileImage? (
          <img
            className="profile_header_avatar"
            onClick={onphoto}
            src={user.profileImage}
          />
        ) : (
          <button className="photobtn">
            <Avatar
              className="profile_header_avatar"
              onClick={onavatar}
              style={{ width: "150px", height: "150px", margin: "40px" }}
            ></Avatar>
            <input
              type="file"
              ref={hiddeninput}
              name="ImageUrl"
              onChange={(e) => {
                setImageUrl(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
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
              <Settingpopup
                openpop={open}
                Onclose={() => {
                  setopen(false);
                }}
              />
              <SettingsIcon />
            </button>
          </div>
          <div className="profile_icon">
            <span>{length} post</span>
            <span> {followers} followers </span>
            <span> {following} following</span>
          </div>
          <div className="profile_icon">{User.name}</div>
          <Profilepopup
            Open={showpopup}
            onClose={() => {
              setshowpopup(false);
            }}
            remove={Remove}
            upload={Upload}
          />
        </div>
      </div>
    </div>
  );
};
export default Profile_header;
