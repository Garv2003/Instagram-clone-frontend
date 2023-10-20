import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./NoPost.css";
import { Link } from "react-router-dom";
const NoPost = () => {
  return (
    <>
      <div className="no-post">
       <div className="post-body">
       <CameraAltIcon sx={{ fontSize: "100px" }} />
       <h1 className="nopost-heading">Share Photos</h1>
        <div> When you share photos, they will appear on your profile.</div>
        <Link to="/create">
        <button className="btnpost">Share your first photo</button>
        </Link>
       </div>
      </div>
    </>
  );
};

export default NoPost;
