import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import "./Savedpost.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Profile = ({ data }) => {
  return (
    <div className="gallery">
      {data.map((post) => {
        return (
          <div className="gallery-item" key={post._id}>
            <div>
              <LazyLoadImage
                // PlaceholderSrc={"dsds"}
                className="gallery-post"
                effect="blur"
                src={post.ImageUrl}
              />
              <div />
              <Link to={`/p/${post._id}`}>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes cl">
                      <span className="visually-hidden">Likes:</span>
                      <FavoriteIcon />
                      {post.likes.length}
                    </li>
                    <li className="gallery-item-comments cl">
                      <span className="visually-hidden">Comments:</span>
                      <CommentIcon />
                      {post.comments.length}
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

export default Profile;
