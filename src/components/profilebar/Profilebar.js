import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { AccountCircle } from "@mui/icons-material";
import UseFollow from "../../Hooks/UseFollow";

const Profilebar = ({ post }) => {
  const { Info, Id } = useContext(AuthContext);
  const { follow, setFollow, handleFollowAction } = UseFollow(
    post.followers.includes(Id)
  );

  return (
    <div key={post._id}>
      {post._id !== Id ? (
        <div className="suggestions__username">
          <div className="username__left">
            <Link to={`/sp/${post._id}`} className="avatar cl">
              {post.profileImage ? (
                <img
                  className="postprofileimage"
                  src={post.profileImage}
                  alt="profile"
                />
              ) : (
                <AccountCircle sx={{ fontSize: 35 }} />
              )}
            </Link>
            <div className="username__info">
              <Link to={`/sp/${post._id}`} className="username cl">
                {post.username}
              </Link>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          {follow ? (
            <button
              className="follow__button"
              onClick={() => handleFollowAction(post._id, false)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="follow__button"
              onClick={() => handleFollowAction(post._id, true)}
            >
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
