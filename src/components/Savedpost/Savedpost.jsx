import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import "./Savedpost.css";

const Profile = ({ data }) => {
  return (
    <div className="gallery">
      {data.map((post) => {
        return (
          <div className="gallery-item" key={post._id}>
            <div>
              <img className="gallery-post" src={post.ImageUrl} alt="" />
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
