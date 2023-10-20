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
import UseBookMark from "../../Hooks/UseBookMark";
import UseLike from "../../Hooks/UseLike";
import UseFollow from "../../Hooks/UseFollow";
import UseComment from "../../Hooks/UseComment";
import { formatInstagramDate } from "../../utils/utils";

const Post = ({ post }) => {
  const {
    comment,
    setComment,
    commentlength,
    setCommentLength,
    addCommentToPost,
  } = UseComment(post.comments.length);
  const { Id } = useContext(AuthContext);
  const { bookmark, bookmarkPostAction } = UseBookMark(
    post.bookmarks.includes(Id)
  );
  const { like, likes, handleLikeAction } = UseLike(
    post.likes.includes(Id),
    post.likes.length
  );
  const { follow, handleFollowAction } = UseFollow(
    post.User_id.followers.includes(Id)
  );
  const [EmojiBox, setEmojiBox] = useState(false);
  const formattedDate = formatInstagramDate(post.date);

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
            {follow ? (
              <button
                className="follow__button"
                onClick={() => handleFollowAction(post.User_id._id, false)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow__button"
                onClick={() => handleFollowAction(post.User_id._id, true)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <MoreHorizIcon />
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
                  handleLikeAction(post._id, false);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  handleLikeAction(post._id, true);
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
                  bookmarkPostAction(post._id, false);
                }}
              />
            ) : (
              <BookmarkBorderIcon
                className="postIcon"
                sx={{ fontSize: 45 }}
                onClick={() => {
                  bookmarkPostAction(post._id, true);
                }}
              />
            )}
          </div>
        </div>
        <div>{likes} likes</div>
        <div className="postp_title">{post.title}</div>
        <div className="postp_description">{post.description}</div>
      </div>
      <div className="profile_footer1">
        <Link className="cl" to={`/p/${post._id}`}>
          View all {commentlength} comments
        </Link>
        <div className="formposts">
          <button
            className="emoji__button"
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
