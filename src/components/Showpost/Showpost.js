import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Showpost.css";
import { Avatar } from "@mui/material";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Showpost = () => {
  const [update, setupdate] = useState(false);
  const [spost, setspost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getpost();
  },[]);
  const getpost = async () => {
    const res = await axios.get(URL(`/post/showpost/${id}`));
    setspost(res.data.post);
  };
  const navigate = useNavigate();
  function deletepost() {
    axios.get(URL(`/post/deletepost/${id}`)).then((res) => {
      navigate("/profile");
    });
  }
  function updatepost() {}
  let p=spost;
  return (
    <div className="showpost">
      <div className="shwpost1">
        <img className="im" src={spost.ImageUrl}></img>
        <div className="showbuttons">
          <button className="showbtn" onClick={deletepost}>
            Delete
          </button>
          <button className="showbtn" onClick={updatepost}>
            Edit
          </button>
          <button className="showbtn">About this account</button>
        </div>
      </div>
      <div>
        <div>
          {/* {p.User_id.profileImage ? (
            <img className="profile_header_avatar" src={p.profileImage} />
          ) : ( */}
            <button className="photobtn">
              <Avatar
                className="profile_header_avatar"
                style={{ width: "32px", height: "32px", margin: "40px" }}
              ></Avatar>
            </button>
          {/* )}  */}
           <div>{spost.title}</div> 
        </div>
        <div className="commnetbody">

        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Showpost;
