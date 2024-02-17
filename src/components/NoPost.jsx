import { FaCamera } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineSlideshow } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Data = [
  {
    icon: (
      <FaCamera
        style={{
          width: "80px",
          height: "80px",
        }}
      />
    ),
    heading: "Share Photos",
    para: "When you share photos, they will appear on your profile.",
    btn: "Share your first photo",
  },
  {
    icon: (
      <IoBookmarkOutline
        style={{
          width: "80px",
          height: "80px",
        }}
      />
    ),
    heading: "Share Photos",
    para: "Save photos and videos that you want to see again. No one is notified,and only you can see what you've saved.",
    btn: "",
  },
  {
    icon: (
      <MdOutlineSlideshow
        style={{
          width: "80px",
          height: "80px",
        }}
      />
    ),
    heading: "Share Reels",
    para: "When you share reels, they will appear on your profile.",
    btn: "Share your first reels",
  },
];

const NoPost = ({ index }) => {
  return (
    <>
      <div className="no-post">
        <div className="post-body">
          {Data[index].icon}
          <h1 className="nopost-heading">{Data[index].heading}</h1>
          <div>{Data[index].para}</div>
          <Link to="/create">
            <button className="btnpost">{Data[index].btn}</button>
          </Link>
        </div>
      </div>
    </>
  );
};

NoPost.propTypes = {
  index: PropTypes.number.isRequired,
};

export default NoPost;
