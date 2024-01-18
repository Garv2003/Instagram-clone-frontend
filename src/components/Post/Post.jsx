import { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { MdMoreHoriz } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { UseAuth } from "../../Context/Auth/AuthContext";
import Picker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import UseBookMark from "../../Hooks/UseBookMark";
import UseLike from "../../Hooks/UseLike";
import UseFollow from "../../Hooks/UseFollow";
import UseComment from "../../Hooks/UseComment";
import { formatInstagramDate } from "../../utils/utils";
import PropTypes from "prop-types";

const Post = ({ post }) => {
  const {
    comment,
    setComment,
    commentlength,
    setCommentLength,
    addCommentToPost,
  } = UseComment(post.comments.length);
  const { Id } = UseAuth();
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
            <RxAvatar
              style={{
                fontSize: "40px",
                cursor: "pointer",
              }}
            />
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
            • {formattedDate} •{" "}
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
        <MdMoreHoriz
          style={{ fontSize: "2.5rem", cursor: "pointer" }}
          className="postIcon"
        />
      </div>
      <div className="postp_image">
        <img src={post.ImageUrl} alt="PostImage" />
      </div>
      <div className="postp_footer">
        <div className="posticons">
          <div className="post_iconsMain">
            {like ? (
              <MdFavorite
                className="postIcon"
                style={{
                  fontSize: "3rem",
                  color: "red",
                }}
                onClick={() => {
                  handleLikeAction(post._id, false);
                }}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="postIcon"
                style={{ fontSize: "3rem" }}
                onClick={() => {
                  handleLikeAction(post._id, true);
                }}
              />
            )}
            <Link to={`/p/${post._id}`}>
              <MdOutlineChatBubbleOutline
                className="postIcon"
                style={{ fontSize: 45 }}
              />
            </Link>
            <FaTelegramPlane
              className="postIcon"
              style={{ fontSize: 45 }}
              onClick={() => {
                setComment("");
              }}
            />
          </div>
          <div className="post_iconsb">
            {bookmark ? (
              <FaBookmark
                className="postIcon"
                style={{ fontSize: 45 }}
                onClick={() => {
                  bookmarkPostAction(post._id, false);
                }}
              />
            ) : (
              <MdBookmarkBorder
                className="postIcon"
                style={{ fontSize: 45 }}
                onClick={() => {
                  bookmarkPostAction(post._id, true);
                }}
              />
            )}
          </div>
        </div>
        <div>{likes} likes</div>
        <div className="postp_title">{post.caption}</div>
        <div className="postp_description">{post.location}</div>
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
            <MdEmojiEmotions style={{ fontSize: "1.8rem", color: "white" }} />
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

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
