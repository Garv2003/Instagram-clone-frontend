import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./Notifications.css";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
const Notifications = () => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
  }, []);

  const getsuggestion = () => {
    axios.get(URL("/user/suggestion")).then((res) => {
      setuser(res.data);
      console.log(res.data);
    });
  };
  return (
    <div className="notifications">
      <div className="notifications_header">
        <h1 classsName="not_heading">Notifications</h1>
        <div>Activity On Your Posts</div>
        <div>
          When someone likes or comments on one of your posts, you'll see it
          here.
        </div>
      </div>
      <div className="not_body">
        <div className="suggestions__title">
          <div>Suggestions for you</div>
        </div>
        <div className="suggestions__usernames">
          {user.map((post) => (
            <div>
              {post._id != localStorage.getItem("token") ? (
                <div className="suggestions__username">
                  <div className="username__left">
                    <Link to={`/showprofile/${post._id}`} className="avatar">
                      <Avatar>{post.username[0]}</Avatar>
                    </Link>
                    <div className="username__info">
                      <Link to={`/showprofile/${post._id}`} className="username cl">{post.username}</Link>
                      <span className="relation">New to Instagram</span>
                    </div>
                  </div>
                  <button className="follow__button">Follow</button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="notifications_footer">
        <span>About Help Press API Jobs Privacy Terms </span>
        <div>Locations Language English Meta Verified</div>
        <div>© 2023 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
};

export default Notifications;
