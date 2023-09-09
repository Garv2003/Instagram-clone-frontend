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
import BookmarkIcon from "@mui/icons-material/Bookmark";
const {
  follow,
  unfollow,
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmark,
  formatInstagramDate,
  addCommentToPost,
} = require("../../utils/utils");

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(
    post.likes.includes(localStorage.getItem("token"))
  );
  const [likecount, setLikeCount] = useState(post.likes.length);
  const [commentlength, setCommentLength] = useState(post.comments.length);
  const [followed, setFollowed] = useState(
    post.User_id.followers.includes(localStorage.getItem("token"))
  );
  const [bookmark, setBookmark] = useState(
    post.bookmarks.includes(localStorage.getItem("token"))
  );
  const formattedDate = formatInstagramDate(post.date);

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      setFollowed(res);
    });
  };

  const toggleLike = (id) => {
    const likeAction = like ? unlikePost : likePost;
    likeAction(id).then((res) => {
      setLike(res);
      if (res) {
        setLikeCount(likecount + 1);
      } else {
        setLikeCount(likecount - 1);
      }
    });
  };

  const toggleBookmark = (id) => {
    const bookmarkAction = bookmark ? unbookmark : bookmarkPost;
    bookmarkAction(id).then((res) => {
      setBookmark(res);
    });
  };

  const addComment = async (e) => {
    e.preventDefault();
    addCommentToPost(post._id, comment).then((res) => {
      if (res) {
        setCommentLength(commentlength + 1);
        setComment("");
      }
    });
  };

  return (
    <div className="Postp" key={post._id}>
      <div className="Postp_header">
        <div className="postp_header_pro">
          {post.User_id.profileImage ? (
            <img
              className="postprofileimage"
              src={post.User_id.profileImage}
              alt="profile"
            />
          ) : (
            <Avatar style={{ marginRight: "10px" }}>
              {post.User_id.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Link
            to={
              post.User_id._id === localStorage.getItem("token")
                ? "/profile"
                : `/showprofile/${post.User_id._id}`
            }
            className="cl"
          >
            {post.User_id.username}
          </Link>
          <Link
            className="cl date"
            to={
              post.User_id._id === localStorage.getItem("token")
                ? "/profile"
                : `/showprofile/${post.User_id._id}`
            }
          >
            {" "}
            •{formattedDate}•{" "}
          </Link>
          <div>
            {" "}
            {followed ? (
              <button
                className="follow__button"
                onClick={() => toggleFollow(post.User_id._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow__button"
                onClick={() => toggleFollow(post.User_id._id)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <MoreHorizIcon></MoreHorizIcon>
      </div>
      <div className="postp_image">
        <img src={post.ImageUrl} alt="PostImage" />
      </div>
      <div className="postp_footer">
        <div className="posticons">
          <div className="post_iconsMain">
            {like ? (
              <FavoriteIcon
                style={{ color: "red" }}
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  toggleLike(post._id);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  toggleLike(post._id);
                }}
              />
            )}
            <Link to={`/showpost/${post._id}`}>
              <ChatBubbleOutlineIcon
                sx={{ fontSize: 45 }}
                className="postIcon cl"
              />
            </Link>
            <TelegramIcon sx={{ fontSize: 45 }} className="postIcon" />
          </div>
          <div className="post_iconsb">
            {bookmark ? (
              <BookmarkIcon
                style={{ color: "white" }}
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  toggleBookmark(post._id);
                }}
              />
            ) : (
              <BookmarkBorderIcon
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  toggleBookmark(post._id);
                }}
              />
            )}
          </div>
        </div>
        <div>{likecount} likes</div>
      </div>
      <div className="profile_footer1">
        <Link className="cl" to={`/showpost/${post._id}`}>
          View all {commentlength} comments
        </Link>
        <form className="formposts" onSubmit={addComment}>
          <div className="field">
            <input
              id="username"
              type="text"
              className="formposts_input"
              placeholder="Add a comment...."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <label className="login-label" htmlFor="username">
              Add a comment...
            </label>
            <input className="formposts_button" type="submit" value="Post" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
