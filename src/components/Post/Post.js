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
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Post = ({ post }) => {
  const [info, setinfo] = useState("");
  const [like, setlike] = useState(
    post.likes.includes(localStorage.getItem("token"))
  );
  const [likecount, setlikecount] = useState(post.likes.length);
  const [commentlength, setcommentlength] = useState(post.comments.length);
  const [fol, setfol] = useState(
    post.User_id.followers.includes(localStorage.getItem("token"))
  );
  const [bookmark, setbookmark] = useState(
    post.bookmarks.includes(localStorage.getItem("token"))
    // false
  );

  const follow = (userid) => {
    axios
      .put(URL("/user/follow"), {
        followId: userid,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setfol(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollow = (userid) => {
    axios
      .put(URL("/user/unfollow"), {
        followId: userid,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setfol(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addinfo = (e) => {
    e.preventDefault();
    onsubmit(post._id, info);
    setinfo("");
  };

  async function Like(id) {
    await axios
      .put(URL("/post/like"), {
        postid: id,
        id: localStorage.getItem("token"),
      })
      .then((res) => {
        setlike(true);
        setlikecount(likecount + 1);
      });
  }
  async function Unlike(id) {
    const res = await axios
      .put(URL("/post/unlike"), {
        postid: id,
        id: localStorage.getItem("token"),
      })
      .then(() => {
        setlike(false);
        setlikecount(likecount - 1);
      });
  }

  async function Bookmark(id) {
    await axios
      .put(URL("/post/bookmark"), {
        postid: id,
        id: localStorage.getItem("token"),
      })
      .then((res) => {
        setbookmark(true);
      });
  }
  async function Unbookmark(id) {
    const res = await axios
      .put(URL("/post/unbookmark"), {
        postid: id,
        id: localStorage.getItem("token"),
      })
      .then(() => {
        setbookmark(false);
      });
  }

  const onsubmit = async (id, text) => {
    await axios
      .put(URL("/post/addcomment"), {
        id: id,
        text: text,
      })
      .then((res) => {
        setcommentlength(commentlength + 1);
      });
  };

  return (
    <div className="Postp" key={post._id}>
      <div className="Postp_header">
        <div className="postp_header_pro">
          {post.User_id.profileImage ? (
            <img className="postprofileimage" src={post.User_id.profileImage} />
          ) : (
            <Avatar style={{ marginRight: "10px" }}>
              {post.User_id.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Link to={`/showprofile/${post.User_id._id}`} className="cl">
            {post.User_id.username}
          </Link>
          <Link className="cl" to={`/showprofile/${post.User_id._id}`}>
            {" "}
            •12h•{" "}
          </Link>
          <div>
            {" "}
            {fol ? (
              <button
                className="follow__button"
                onClick={() => unfollow(post.User_id._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow__button"
                onClick={() => follow(post.User_id._id)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <MoreHorizIcon></MoreHorizIcon>
      </div>
      <div className="postp_image">
        <img src={post.ImageUrl} alt="Post Image" />
      </div>
      <div className="postp_footer">
        <div className="posticons">
          <div className="post_iconsMain">
            {like ? (
              <FavoriteIcon
                style={{ color: "red" }}
                className="postIcon"
                onClick={(e) => {
                  Unlike(post._id);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="postIcon"
                onClick={() => {
                  Like(post._id);
                }}
              />
            )}
            <Link to={`/showpost/${post._id}`}>
              <ChatBubbleOutlineIcon className="postIcon cl" />
            </Link>
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post_iconsb">
            {bookmark ? (
              <BookmarkIcon
                style={{ color: "white" }}
                className="postIcon"
                onClick={() => {
                  Unbookmark(post._id);
                }}
              />
            ) : (
              <BookmarkBorderIcon
                className="postIcon"
                onClick={() => {
                  Bookmark(post._id);
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
            <label className="login-label" htmlFor="username">
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
