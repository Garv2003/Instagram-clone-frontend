import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Suggestions.css";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
function Suggestions(props) {
  const {user}=props;
  console.log(user)
  return (
    <div className="suggestions">
       <div>
        {user.map((post) => (
          <div>
            {post._id===localStorage.getItem('token')? <div className="suggestions__username">
              <div className="username__left">
                <Link  to="/profile" className="avatar">
                  <Avatar>{post.username[0]}</Avatar>
                </Link>
                <div className="username__info">
                  <Link  to="/profile" className="username cl">{post.username}</Link>
                  <span className="relation">New to Instagram</span>
                </div>
              </div>
            </div>:<div></div>}
          </div>
        ))}
      </div>
      <div className="suggestions__title">
        <div>Suggestions for you</div>
        <Link to="/notifications" className="seeall">
          See All
        </Link>
      </div>
      <div className="suggestions__usernames">
        <div className="usersuggestions"></div>
      </div>
      <div>
        {user.map((post) => (
          <div>
           {post._id!=localStorage.getItem('token')? <div className="suggestions__username">
              <div className="username__left">
              <Link className="cl "to={`/showprofile/${post._id}`}>
                  <Avatar>{post.username[0]}</Avatar>
                </Link>
                <div className="username__info">
                  <Link to={`/showprofile/${post._id}`} className="username cl">{post.username}</Link>
                  <span className="relation">New to Instagram</span>
                </div>
              </div>
              <button className="follow__button">Follow</button>
            </div>:<div></div>}
          </div>
        ))}
      </div>
      <div className="suggestion_footer">
        <div>About.Help.Press.API.Jobs.Privacy.Terms. </div>
        <div>Locations Language English Meta Verified</div>
        <div>© 2023 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
}

export default Suggestions;
