import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import InstagramIcon from "@mui/icons-material/Instagram";
import InstagramLogo from "../../assets/instagram-logo.png";

import {
  Home,
  Search,
  Explore,
  Slideshow,
  Chat,
  FavoriteBorder,
  AddCircleOutline,
  Menu,
  AccountCircle,
} from "@mui/icons-material";
// import { UseTheme } from "../../Context/Theme/ThemeContext";

const NavigationButton = ({ icon, text, to }) => {
  return to === "/notifications" || to === "/search" ? (
    <Link to={to} className="navbutton cl hiddenicon">
      {icon}
      <span>{text}</span>
    </Link>
  ) : (
    <Link to={to} className="navbutton cl">
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const { Theme } = UseTheme();

  return (
    <div className="navbar">
      <div className="navlist">
        <Link to="/">
          <img className="logo" src={InstagramLogo} alt="Instagram Logo" />
          <div className="navbutton logo2">
            {" "}
            <InstagramIcon sx={{ color: "white" }} />
          </div>
        </Link>
        <div className="navbarbuttons">
          <NavigationButton icon={<Home />} text="Home" to="/" />
          <NavigationButton icon={<Search />} text="Search" to="/search" />
          <NavigationButton icon={<Explore />} text="Explore" to="/explore" />
          <NavigationButton icon={<Slideshow />} text="Reels" to="/Reels" />
          <NavigationButton icon={<Chat />} text="Messages" to="/message" />
          <NavigationButton
            icon={<FavoriteBorder />}
            text="Notifications"
            to="/notifications"
          />
          <NavigationButton
            icon={<AddCircleOutline />}
            text="Create"
            to="/create"
          />
          <NavigationButton
            icon={<AccountCircle />}
            text="Profile"
            to="/profile"
          />
        </div>
        <div className="navbutton_more">
          {open && <Popup Open={open} onClose={() => setOpen(false)} />}
          <button onClick={() => setOpen(!open)} className="navbutton">
            <Menu sx={{ color: "white" }} />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
