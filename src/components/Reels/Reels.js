import React, { useState, useEffect } from "react";
import "./Reels.css";
import Profile_footer from "../Profile_footer/Profile_footer";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
const Reels = () => {
  const [info, setinfo] = useState("");
  const [exoposts, setExoposts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const addinfo = (e) => {
    e.preventDefault();
    onsubmit(a, info);
    setinfo("");
  };
  async function showid(id) {
    console.log(localStorage.getItem("token"));
    await axios
      .put(
        URL("/post/like"),
        {
          postid: id,
          id:token
        }
      )
      .then((res) => {
        console.log(res);
      });
  }
  async function Unlike(id) {
    const res = await axios.put(URL("/post/unlike"), {
      postid: id,
      id:localStorage.getItem("token")
    });
  }
  const onsubmit = async (id, text) => {
    await axios
      .put(
        URL("/post/addcomment"),
        {
          headers: {
            authorization: localStorage.getItem("token"),
          }
        },
        {
          id: id,
          text: text,
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const getdata = async () => {
    const res = await axios.get(URL("/post/explore"));
    setExoposts(res.data);
  };
  const token = localStorage.getItem("token");
  return (
    <div className="explore">
      <div className="explore_header">
        {exoposts.map((post) => {
          return (
            <div className="Postp" key={post._id}>
              <div className="Postp_header">
                <div className="postp_header_pro">
                  <Avatar style={{ marginRight: "10px" }}>
                    {post.User_id.username.charAt(0).toUpperCase()}
                  </Avatar>{" "}
                  {post.User_id.name} <span>•12h•</span>
                  <div>follow</div>
                </div>
                <MoreHorizIcon></MoreHorizIcon>
              </div>
              <div className="postp_image">
                <img src={post.ImageUrl} alt="Post Image" />
              </div>
              <div className="postp_footer">
                <div className="posticons">
                  <div className="post_iconsMain">
                    {(
                      post.likes != undefined
                        ? post.likes.includes(token)
                        : false
                    ) ? (
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
                        onClick={(e) => {
                          showid(post._id);
                        }}
                      />
                    )}
                    <Link to={`/showpost/${post._id}`}>
                      <ChatBubbleOutlineIcon className="postIcon cl" />
                    </Link>
                    <TelegramIcon className="postIcon" />
                  </div>
                  <div className="post_iconsb">
                    <BookmarkBorderIcon className="postIcon" />
                  </div>
                </div>
                <div>{post.likes.length} likes</div>
              </div>
              <div className="profile_footer1">
                <Link className="cl" to={`/showpost/${post._id}`}>
                  View all {post.comments.length} comments
                </Link>
                <form className="formposts" onSubmit={addinfo}>
                  <input
                    className="formposts_input"
                    type="text"
                    value={info}
                    placeholder="Add a comment...."
                    onChange={(e) => {
                      setinfo(e.target.value);
                    }}
                  />
                  <input
                    className="formposts_button"
                    type="submit"
                    value="Post"
                  />
                </form>
              </div>
            </div>
          );
        })}
      </div>
      <div className="explore_footer">
        <Profile_footer />
      </div>
    </div>
  );
};

export default Reels;
