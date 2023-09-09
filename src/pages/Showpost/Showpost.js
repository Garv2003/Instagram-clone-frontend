import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Showpost.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
  const [Post, setPost] = useState({});
  const [userpost, setUserpost] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [comment, setComment] = useState("");
  const [commentlength, setCommentLength] = useState(0);
  const [commentarr, setCommentArr] = useState([]);
  const [username, setUsername] = useState("");
  const [like, setLike] = useState(false);
  const [likecount, setLikeCount] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setProgress(0);
    getPost();
  }, []);

  const getPost = async () => {
    try {
      await axios.get(`${API_URL}/post/showpost/${id}`).then((res) => {
        console.log(res.data);
        setPost(res.data);
        setProgress(100);
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const navigate = useNavigate();

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      setFollowed(res);
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

  const handledelete = (id) => {
    deletePost(id).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  const updatePost = () => {
    // Implement the update post functionality here
  };

  return (
    <div className="showpost">
      <div className="showpost1">
        <img className="im" src={Post.ImageUrl} alt="Post" />
        <div className="showbuttons">
          {userpost === localStorage.getItem("token") ? (
            <button className="showbtn" onClick={() => handledelete(Post._id)}>
              Delete
            </button>
          ) : (
            ""
          )}
          <button className="showbtn" onClick={updatePost}>
            Edit
          </button>
          <button className="showbtn">About this account</button>
        </div>
      </div>
      <div className="showpost2">
        <div className="Postp_header">
          <div className="postp_header_pro">
            {profileImage ? (
              <img
                className="postprofileimage"
                src={profileImage}
                alt="profile"
              />
            ) : (
              <Avatar style={{ marginRight: "10px" }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Link to={`/showprofile/${user._id}`} className="cl">
              {username}
            </Link>
            <div>
              {followed ? (
                <button
                  className="follow__button"
                  onClick={() => toggleFollow(user._id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="follow__button"
                  onClick={() => toggleFollow(user._id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="commentsection">
          {commentarr.map((comment, index) => (
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
                  onClick={() => toggleLike(Post._id)}
                />
              ) : (
                <FavoriteBorderIcon
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={() => toggleLike(Post._id)}
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
                  onClick={() => toggleBookmark(Post._id)}
                />
              ) : (
                <BookmarkBorderIcon
                  className="postIcon"
                  sx={{ fontSize: 45 }}
                  onClick={() => toggleBookmark(Post._id)}
                />
              )}
            </div>
          </div>
          <div>{likecount} likes</div>
          <Link className="cl" to={`/showprofile/${user._id}`}>
            {formatInstagramDate(Post.date)}
          </Link>
        </div>
        <div className="profile_footer1">
          View all {commentlength} comments
          <form className="formposts" onSubmit={addComment}>
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
