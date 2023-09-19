import React, { useState, useContext } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AuthContext } from "../../Context/Auth/AuthContext";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

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
  const { info, Id } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.includes(Id));
  const [likecount, setLikeCount] = useState(post.likes.length);
  const [commentlength, setCommentLength] = useState(post.comments.length);
  const [followed, setFollowed] = useState(post.User_id.followers.includes(Id));
  const [bookmark, setBookmark] = useState(post.bookmarks.includes(Id));
  const [EmojiBox, setEmojiBox] = useState(false);
  const formattedDate = formatInstagramDate(post.date);

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      if (res) {
        post.User_id.followers.push(Id);
        setFollowed(res);
      } else {
        post.User_id.followers.pop(Id);
        setFollowed(res);
      }
    });
  };

  const toggleLike = (id) => {
    const likeAction = like ? unlikePost : likePost;
    likeAction(id).then((res) => {
      setLike(res);
      if (res) {
        post.likes.push(Id);
        setLikeCount(likecount + 1);
      } else {
        post.likes.pop(Id);
        setLikeCount(likecount - 1);
      }
    });
  };

  const toggleBookmark = (id) => {
    const bookmarkAction = bookmark ? unbookmark : bookmarkPost;
    bookmarkAction(id).then((res) => {
      res ? post.bookmarks.push(Id) : post.bookmarks.pop(Id);
      setBookmark(res);
    });
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.length === 0) return;
    addCommentToPost(post._id, comment).then((res) => {
      if (res) {
        post.comments.push(res);
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
            <AccountCircle style={{ fontSize: 35, marginRight: 5 }}>
              {post.User_id.username.charAt(0).toUpperCase()}
            </AccountCircle>
          )}
          <Link
            to={
              post.User_id._id === localStorage.getItem("token")
                ? "/profile"
                : `/sp/${post.User_id._id}`
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
                : `/sp/${post.User_id._id}`
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
            <Link to={`/p/${post._id}`}>
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
        <Link className="cl" to={`/p/${post._id}`}>
          View all {commentlength} comments
        </Link>
        <div className="formposts">
          <button className="emoji__button"
            onClick={() => setEmojiBox(!EmojiBox)}
            style={{ backgroundColor: "black", border: 0 }}
          >
            <EmojiEmotionsIcon sx={{ color: "white" }} />
          </button>
          <div className="emoji">
            {EmojiBox && (
              <Picker
                onEmojiClick={(event) => {
                  setComment(comment + event.emoji);
                  // setEmojiBox(false)
                }}
                pickerStyle={{ width: "100%" }}
              />
            )}
          </div>
          <input
            id="username"
            type="text"
            className="formposts_input"
            placeholder="Add a comment...."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
            onFocus={() => setEmojiBox(false)}
          />
          <input
            disabled={comment.length == 0}
            className="formposts_button"
            type="submit"
            value="Post"
            onClick={addComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
