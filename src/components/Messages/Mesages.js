import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import "./Messages.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Mesages = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    getuser();
  }, []);

  const getuser = () => {};

  return (
    <div className="messages">
      <div className="message_left">
        <div className="message_header">
          <div></div>
          <div></div>
        </div>
        <div className="friends">
          <div>
            <div className="suggestions__username">
              <div className="username__left">
                {/* <Link className="cl " to={`/showprofile/${post._id}`}> */}
                <Avatar></Avatar>
                {/* </Link> */}
                <div className="username__info">
                  {/* <Link to={`/showprofile/${post._id}`} className="username cl"> */}
                  {/* {post.username} */}
                  {/* </Link> */}
                  <span className="relation">New to Instagram</span>
                </div>
              </div>
              <button className="follow__button">Message</button>
            </div>
          </div>
          <div>
            <div className="suggestions__username">
              <div className="username__left">
                {/* <Link className="cl " to={`/showprofile/${post._id}`}> */}
                <Avatar></Avatar>
                {/* </Link> */}
                <div className="username__info">
                  {/* <Link to={`/showprofile/${post._id}`} className="username cl"> */}
                  {/* {post.username} */}
                  {/* </Link> */}
                  <span className="relation">New to Instagram</span>
                </div>
              </div>
              <button className="follow__button">Message</button>
            </div>
          </div>
        </div>
      </div>
      <div className="message_right">
        <div className="message_body">
          <div><ChatIcon/></div>
          <div>Your messages</div>
          <div>Send private photos and messages to a friend or group</div>
          <button>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Mesages;
