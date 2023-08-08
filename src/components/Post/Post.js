import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({
  user,
  postImage,
  a,
  likes,
  Showid,
  unlike,
  post,
  onsubmit,
}) => {
  const [info, setinfo] = useState("");
  const addinfo = (e) => {
    e.preventDefault();
    onsubmit(a, info);
    setinfo("");
  };
  return (
    <div className="Postp" key={a}>
      <div className="Postp_header">
        <div className="postp_header_pro">
          <Link className="cl" to={`/showprofile/${a}`}>
            <Avatar style={{ marginRight: "10px" }}>
              {user.charAt(0).toUpperCase()}
            </Avatar>{" "}
          </Link>
          <Link to={`/showprofile/${a}`} className="cl">
            {user}
          </Link>
          <span>•12h•</span>
          <div>follow</div>
        </div>
        <MoreHorizIcon></MoreHorizIcon>
      </div>
      <div className="postp_image">
        <img src={postImage} alt="Post Image" />
      </div>
      <div className="postp_footer">
        <div className="posticons">
          <div className="post_iconsMain">
            {(
              post.likes != undefined
                ? post.likes.includes(localStorage.getItem("token"))
                : false
            ) ? (
              <FavoriteIcon
                style={{ color: "red" }}
                className="postIcon"
                onClick={(e) => {
                  unlike(a);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="postIcon"
                onClick={(e) => {
                  Showid(a);
                }}
              />
            )}
            <Link to={`/showpost/${a}`}>
              <ChatBubbleOutlineIcon className="postIcon cl" />
            </Link>
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post_iconsb">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        <div>{likes} likes</div>
      </div>
      <div className="profile_footer1">
        <Link className="cl" to={`/showpost/${a}`}>
          View all {post.comments.length} comments
        </Link>
        <form className="formposts" onSubmit={addinfo}>
          <div className="field">
            <input
              id="username"
              type="text"
              className="formposts_input"
              placeholder="Add a comment...."
              onChange={(e) => {
                setinfo(e.target.value);
              }}
              value={info}
            />
            <label className="login-label" for="username">
              Add a commet...
            </label>
            <input className="formposts_button" type="submit" value="Post" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
