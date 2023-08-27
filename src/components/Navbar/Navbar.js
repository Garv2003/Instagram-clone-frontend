import React, { useState } from "react";
import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, BrowserRouter } from "react-router-dom";
import Popup from "../Popup/Popup";
const Navbar = () => {
  const [open, setopen] = useState(false);
  return (
    <div className="navbar1">
      <Link to="/">
        {" "}
        <img
          className="logo"
          src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
          alt="Instagram Logo"
        />
      </Link>
      <div className="navbarbuttons">
        <button className="navbutton">
          <HomeIcon />
          <span>
            {" "}
            <Link className="cl" to="/">
              Home
            </Link>{" "}
          </span>
        </button>
        <button className="navbutton">
          <SearchIcon />
          <span>
            <Link className="cl" to="/search">
              Search
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <ExploreIcon />
          <span>
            <Link className="cl" to="/explore">
              Explore
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <SlideshowIcon />
          <span>
            <Link className="cl" to="/Reels">
              Reels
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <ChatIcon />
          <span>
            {" "}
            <Link to="/message" className="cl">
              Messages
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <FavoriteBorderIcon />
          <span>
            <Link className="cl" to="/notifications">
              Notifications
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <AddCircleOutlineIcon />
          <span>
            <Link className="cl" to="/create">
              Create
            </Link>
          </span>
        </button>
        <button className="navbutton">
          <AccountCircleIcon />
          <span>
            <Link className="cl" to="/profile">
              Profile
            </Link>
          </span>
        </button>
      </div>
      <div className="navbutton_more">
        <Popup
          Open={open}
          onClose={() => {
            setopen(false);
          }}
        />
        <button
          onClick={(e) => {
            if (open == true) {
              setopen(false);
            } else {
              setopen(true);
            }
          }}
          className="navbutton"
        >
          <MenuIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
