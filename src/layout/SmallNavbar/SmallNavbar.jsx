import { Link } from "react-router-dom";
import "./SmallNavbar.css";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import PropType from "prop-types";

const NavigationButton = ({ icon, to }) => {
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
          <NavigationButton
            icon={
              <IoSearch
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            }
            to="/search"
          />
          <NavigationButton
            icon={
              <FaRegHeart
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            }
            to="/notifications"
          />
        </div>
      </div>
    </>
  );
};

NavigationButton.propTypes = {
  icon: PropType.element,
  to: PropType.string,
};

export default SmallNavbar;
