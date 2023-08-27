import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profilebar from "../profilebar/Profilebar"
import "./Suggestions.css";

function Suggestions(props) {
  const { user } = props;
  return (
    <div className="suggestions">
      <div className="userprofile">
        {user.map((post) => (
          <div key={post._id}>
            {post._id === localStorage.getItem("token") ? (
              <div className="suggestions__username">
                <div className="username__left">
                  <Link to="/profile" className="avatar">
                    <Avatar>{post.username[0]}</Avatar>
                  </Link>
                  <div className="username__info">
                    <Link to="/profile" className="username cl">
                      {post.username}
                    </Link>
                    <span className="relation">{post.name}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
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
            {post._id != localStorage.getItem("token") ? (
              <Profilebar post={post} key={post._id}/>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
      <div className="suggestion_footer">
        <div className="suggestion_icons">
          <div>About</div>
          .<div>Help</div>
          .<div>Press</div>
          .<div>API</div>
          .<div>Jobs</div>
          .<div>Privacy</div>
          .<div>Terms</div>
          .<div>Locations</div> 
          .<div>Language</div>
          .<div>English</div> 
          .<div>Meta Verified</div>
        </div>
        <div>© 2023 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
}

export default Suggestions;
