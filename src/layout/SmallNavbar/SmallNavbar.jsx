import { Link } from "react-router-dom";
import "./SmallNavbar.css";
import { Search, FavoriteBorder } from "@mui/icons-material";

const NavigationButton = ({ icon, text, to }) => {
  return (
    <Link to={to} className="smallnavbutton cl">
      {icon}
    </Link>
  );
};

const SmallNavbar = () => {
  return (
    <>
      <div className="backgroundblur"></div>
      <div className="smallnavbar">
        <Link to="/">
          <img
            className="smalllogo"
            src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
            alt="Instagram Logo"
          />
        </Link>
        <div className="smallnavbarbuttons">
          <NavigationButton icon={<Search />} text="Search" to="/search" />
          <NavigationButton
            icon={<FavoriteBorder />}
            text="Notifications"
            to="/notifications"
          />
        </div>
      </div>
    </>
  );
};

export default SmallNavbar;
