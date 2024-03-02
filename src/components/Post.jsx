import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../Context/Auth/AuthContext";
import Picker from "emoji-picker-react";
import UseBookMark from "../Hooks/UseBookMark";
import UseLike from "../Hooks/UseLike";
import UseFollow from "../Hooks/UseFollow";
import UseComment from "../Hooks/UseComment";
import { formatInstagramDate } from "../utils/utils";
import PropTypes from "prop-types";
import LazyLoad from "react-lazy-load";
import { Icon } from "../utils/iconutitls";

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

  const [hidden, setHidden] = useState(false);
  const hiddenPopup = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hiddenPopup.current && !hiddenPopup.current.contains(event.target)) {
        setHidden(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hiddenPopup]);

  const SidePopup = () => {
    return (
      <div className="hidden_popup" ref={hiddenPopup}>
        {post.User_id._id === Id && (
          <button
            className="show_btn"
            style={{
              color: "red",
              border: "none",
            }}
          >
            Delete
          </button>
        )}
        <button className="show_btn">
          <Link
            className="cl"
            style={{
              width: "100%",
            }}
            to={`/p/${post._id}`}
          >
            Go to post
          </Link>
        </button>
        {/* <div>
            <button className="show_btn">Share</button>
          </div> */}
        {/* <div>
            <button>Hide like count to others</button>
          </div>
          <div>
            <button>Turn off Commenting for this post</button>
          </div> */}
        <Link
          className="cl"
          style={{
            width: "100%",
          }}
          to={post.User_id._id === Id ? "/profile" : `/sp/${post.User_id._id}`}
        >
          <button className="show_btn">About this account</button>
        </Link>
        <button
          className="show_btn"
          onClick={() => {
            document.body.style.opacity = 1;
            setHidden(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="Postp" key={post._id}>
      <div className="Postp_header">
        <div className="postp_header_pro">
          {post.User_id.profileImage ? (
            <LazyLoad>
              <img
                className="postprofileimage"
                src={post.User_id.profileImage}
                alt="profile"
              />
            </LazyLoad>
          ) : (
            <Icon
              name="RxAvatar"
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
        <Icon
          name="MdMoreHoriz"
          style={{ fontSize: "2.5rem", cursor: "pointer" }}
          className="postIcon"
          onClick={() => {
            setHidden(!hidden);
          }}
        />
      </div>
      {hidden && <SidePopup />}
      <LazyLoad className="postp_image">
        <img src={post.ImageUrl} alt="PostImage" />
      </LazyLoad>
      <div className="postp_footer">
        <div className="posticons">
          <div className="post_iconsMain">
            {like ? (
              <Icon
                name="MdFavorite"
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
              <Icon
                name="MdOutlineFavoriteBorder"
                className="postIcon"
                style={{ fontSize: "3rem" }}
                onClick={() => {
                  handleLikeAction(post._id, true);
                }}
              />
            )}
            <Link to={`/p/${post._id}`}>
              <Icon
                name="MdOutlineChatBubbleOutline"
                className="postIcon"
                style={{ fontSize: 45 }}
              />
            </Link>
            <Icon
              name="FaTelegramPlane"
              className="postIcon"
              style={{ fontSize: 45 }}
              onClick={() => {
                setComment("");
              }}
            />
          </div>
          <div className="post_iconsb">
            {bookmark ? (
              <Icon
                name="FaBookmark"
                className="postIcon"
                style={{ fontSize: 45 }}
                onClick={() => {
                  bookmarkPostAction(post._id, false);
                }}
              />
            ) : (
              <Icon
                name="MdBookmarkBorder"
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
            <Icon
              name="MdEmojiEmotions"
              style={{ fontSize: "1.8rem", color: "white" }}
            />
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
