import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Link } from "react-router-dom";
import { Slideshow } from "@mui/icons-material";
const NoReel = () => {
  return (
    <>
      <div className="no-post">
       <div className="post-body">
       <Slideshow sx={{ fontSize: "100px" }} />
       <h1 className="nopost-heading">Share Reels</h1>
        <div> When you share reels, they will appear on your profile.</div>
        <Link to="/create">
        <button className="btnpost">Share your first reels</button>
        </Link>
       </div>
      </div>
    </>
  );
};

export default NoReel;
