import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const profilebar = ({ post }) => {
  const [fol, setfol] = useState(
    post.followers.includes(localStorage.getItem("token"))
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
  return (
    <div key={post._id}>
      {post._id != localStorage.getItem("token") ? (
        <div className="suggestions__username">
          <div className="username__left">
            <Link to={`/showprofile/${post._id}`} className="avatar">
              {post.profileImage ? (
                <img className="postprofileimage" src={post.profileImage} />
              ) : (
                <Avatar>{post.username[0]}</Avatar>
              )}
            </Link>
            <div className="username__info">
              <Link to={`/showprofile/${post._id}`} className="username cl">
                {post.username}
              </Link>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          {fol ? (
            <button
              className="follow__button"
              onClick={() => unfollow(post._id)}
            >
              Unfollow
            </button>
          ) : (
            <button className="follow__button" onClick={() => follow(post._id)}>
              Follow
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default profilebar;
