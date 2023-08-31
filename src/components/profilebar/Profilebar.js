import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profilebar = ({ post }) => {
  const [Fol, setFol] = useState(
    post.followers.includes(localStorage.getItem("token"))
  );
  const follow = (userid) => {
    axios
      .put(URL("/user/follow"), {
        followId: userid,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setFol(true);
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
        setFol(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div key={post._id}>
      {post._id !== localStorage.getItem("token") ? (
        <div className="suggestions__username">
          <div className="username__left">
            <Link to={`/showprofile/${post._id}`} className="avatar">
              {post.profileImage ? (
                <img className="postprofileimage" src={post.profileImage} alt="profile"/>
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
          {Fol ? (
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

export default Profilebar;
