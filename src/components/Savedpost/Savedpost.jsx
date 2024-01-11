import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import "./Savedpost.css";
import propTypes from "prop-types";

const Profile = ({ data }) => {
  return (
    <div className="gallery">
      {data.map((post) => {
        return (
          <div className="gallery-item" key={post._id}>
            <div>
              <img
                className="gallery-post"
                loading="lazy"
                src={post.ImageUrl}
              />
              <div />
              <Link to={`/p/${post._id}`}>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes cl">
                      <span className="visually-hidden">Likes:</span>
                      <div className="gallery-item-div">
                        <FavoriteIcon />
                        {post.likes.length}
                      </div>
                    </li>
                    <li className="gallery-item-comments cl">
                      <span className="visually-hidden">Comments:</span>
                      <div className="gallery-item-div">
                        <CommentIcon />
                        {post.comments.length}
                      </div>
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Profile.propTypes = {
  data: propTypes.array.isRequired,
};

export default Profile;
