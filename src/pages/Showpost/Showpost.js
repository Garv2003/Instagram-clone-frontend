import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./Showpost.css";
import {
  deletePost,
  unbookmark,
  bookmarkPost,
  follow,
  unfollow,
  likePost,
  unlikePost,
  addCommentToPost,
  formatInstagramDate,
} from "../../utils/utils";

const API_URL = "http://localhost:3456";

const Showpost = ({ setProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    User_id: {
      _id: "",
      username: "",
      profileImage: "",
      followers: [],
    },
    ImageUrl: "",
    comments: [],
    likes: [],
    bookmarks: [],
    date: "",
  });

  const [comment, setComment] = useState("");
  const [commentlength, setCommentLength] = useState(0);
  const [like, setLike] = useState(false);
  const [likecount, setLikeCount] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setProgress(0);
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/showpost/${id}`);
      const postData = response.data;
      setPost(postData);

      const {
        User_id: { _id, username, profileImage, followers },
        ImageUrl,
        comments,
        likes,
        bookmarks,
        date,
      } = postData;

      setCommentLength(comments.length);
      setLike(likes.includes(localStorage.getItem("token")));
      setLikeCount(likes.length);
      setBookmark(bookmarks.includes(localStorage.getItem("token")));
      setFollowed(followers.includes(localStorage.getItem("token")));

      // Set state variables for user data
      setComment("");
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setProgress(100);
    }
  };

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      setFollowed(res);
    });
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const res = await addCommentToPost(post._id, comment);
    if (res) {
      setCommentLength(commentlength + 1);
      setComment("");
    }
  };

  const toggleLikeHandler = () => {
    const likeAction = like ? unlikePost : likePost;
    likeAction(post._id).then((res) => {
      setLike(res);
      setLikeCount((prevCount) => (res ? prevCount + 1 : prevCount - 1));
    });
  };

  const toggleBookmarkHandler = () => {
    const bookmarkAction = bookmark ? unbookmark : bookmarkPost;
    bookmarkAction(post._id).then((res) => {
      setBookmark(res);
    });
  };

  const handleDelete = () => {
    deletePost(post._id).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  const handleUpdate = () => {
    // Implement the update post functionality here
  };

  return (
    <div className="showpost">
      <div className="showpost1">
        <img className="im" src={post.ImageUrl} alt="Post" />
        <div className="showbuttons">
          {post.User_id._id === localStorage.getItem("token") && (
            <button className="showbtn" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button className="showbtn" onClick={handleUpdate}>
            Edit
          </button>
          <button className="showbtn">About this account</button>
        </div>
      </div>
      <div className="showpost2">
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
            {post.User_id._id !== localStorage.getItem("token") && (
              <div>
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
            )}
          </div>
          <MoreHorizIcon />
        </div>
        <div className="commentsection">
          {post.comments.map((comment, index) => (
            <div className="comment" key={index}>
              {console.log(comment)}
              {comment.postedby.profileImage ? (
                <img
                  className="postprofileimage"
                  src={comment.postedby.profileImage}
                  alt="profile"
                />
              ) : (
                <Avatar style={{ marginRight: "10px" }}>
                  {comment.postedby.username.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Link className="cl" to={`/showprofile/${comment.postedby._id}`}>
                {comment.postedby.username}
              </Link>
              {comment.text}
            </div>
          ))}
        </div>
        <div className="postp_footer">
          <div className="posticons">
            <div className="post_iconsMain">
              {like ? (
                <FavoriteIcon
                  style={{ color: "red" }}
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={toggleLikeHandler}
                />
              ) : (
                <FavoriteBorderIcon
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={toggleLikeHandler}
                />
              )}
              <ChatBubbleOutlineIcon
                sx={{ fontSize: 45 }}
                className="postIcon cl"
              />
              <TelegramIcon sx={{ fontSize: 45 }} className="postIcon" />
            </div>
            <div className="post_iconsb">
              {bookmark ? (
                <BookmarkIcon
                  style={{ color: "white" }}
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={toggleBookmarkHandler}
                />
              ) : (
                <BookmarkBorderIcon
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={toggleBookmarkHandler}
                />
              )}
            </div>
          </div>
          <div>{likecount} likes</div>
          <Link className="cl" to={`/showprofile/${post.User_id._id}`}>
            {formatInstagramDate(post.date)}
          </Link>
        </div>
        <div className="profile_footer1">
          View all {commentlength} comments
          <form className="formposts" onSubmit={addCommentHandler}>
            <div className="field">
              <input
                id="username"
                type="text"
                className="formposts_input"
                placeholder="Add a comment...."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <label className="login-label" htmlFor="username">
                Add a comment...
              </label>
              <input className="formposts_button" type="submit" value="Post" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Showpost;
