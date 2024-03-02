import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup";
import InstagramLogo from "../../assets/instagram-logo.png";
import { Icon } from "../../utils/iconutitls";
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
            <Icon
              name="FaInstagram"
              style={{ color: "white", width: "1.8rem", height: "1.8rem" }}
            />
          </div>
        </Link>
        <div className="navbarbuttons">
          <NavigationButton
            icon={<Icon name="GrHomeRounded" className="icon" />}
            text="Home"
            to="/"
          />
          <NavigationButton
            icon={<Icon name="IoSearch" className="icon" />}
            text="Search"
            to="/search"
          />
          <NavigationButton
            icon={<Icon name="MdOutlineExplore" className="icon" />}
            text="Explore"
            to="/explore"
          />
          <NavigationButton
            icon={<Icon name="BiSolidMoviePlay" className="icon" />}
            text="Reels"
            to="/Reels"
          />
          <NavigationButton
            icon={<Icon name="RiMessengerLine" className="icon" />}
            text="Messages"
            to="/message"
          />
          <NavigationButton
            icon={<Icon name="FaRegHeart" className="icon" />}
            text="Notifications"
            to="/notifications"
          />
          <NavigationButton
            icon={<Icon name="BsPlusSquare" className="icon" />}
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
              <Icon name="CgProfile" className="icon" id="pro_icon" />
            )}
            <span>Profile</span>
          </Link>
        </div>
        <div className="navbutton_more">
          {open && <Popup Open={open} onClose={() => setOpen(false)} />}
          <button onClick={() => setOpen(!open)} className="navbutton">
            <Icon name="GiHamburgerMenu" className="icon" />
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
