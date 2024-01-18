import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import InstagramIcon from "@mui/icons-material/Instagram";
import InstagramLogo from "../../assets/instagram-logo.png";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import PropType from "prop-types";
import { UseAuth } from "../../Context/Auth/AuthContext";

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

const Navbar = ({ width }) => {
  const [open, setOpen] = useState(false);
  const { info } = UseAuth();
  // const { Theme } = UseTheme();
  return (
    <div className="navbar" style={width <= 770 ? { display: "none" } : {}}>
      <div className="navlist">
        <Link to="/">
          <img className="logo" src={InstagramLogo} alt="Instagram Logo" />
          <div className="navbutton logo2">
            {" "}
            <InstagramIcon sx={{ color: "white" }} />
          </div>
        </Link>
        <div className="navbarbuttons">
          <NavigationButton
            icon={<GrHomeRounded className="icon" />}
            text="Home"
            to="/"
          />
          <NavigationButton
            icon={<IoSearch className="icon" />}
            text="Search"
            to="/search"
          />
          <NavigationButton
            icon={<MdOutlineExplore className="icon" />}
            text="Explore"
            to="/explore"
          />
          <NavigationButton
            icon={<BiSolidMoviePlay className="icon" />}
            text="Reels"
            to="/Reels"
          />
          <NavigationButton
            icon={<RiMessengerLine className="icon" />}
            text="Messages"
            to="/message"
          />
          <NavigationButton
            icon={<FaRegHeart className="icon" />}
            text="Notifications"
            to="/notifications"
          />
          <NavigationButton
            icon={<BsPlusSquare className="icon" />}
            text="Create"
            to="/create"
          />
          <Link to="/profile" className="navbutton cl">
            {info.profileImage ? (
              <img
                src={info.profileImage}
                alt="profile"
                className="profile_image"
              />
            ) : (
              <CgProfile className="icon" id="pro_icon" />
            )}
            <span>Profile</span>
          </Link>
        </div>
        <div className="navbutton_more">
          {open && <Popup Open={open} onClose={() => setOpen(false)} />}
          <button onClick={() => setOpen(!open)} className="navbutton">
            <GiHamburgerMenu className="icon" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

NavigationButton.propTypes = {
  icon: PropType.element,
  text: PropType.string,
  to: PropType.string,
};

Navbar.propTypes = {
  width: PropType.number,
};

export default Navbar;
