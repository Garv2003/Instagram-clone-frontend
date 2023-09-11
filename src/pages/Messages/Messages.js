import React, { useEffect, useState } from "react";
import "./Messages.css";
import axios from "axios";
import MessageBody from "../../components/MessageBody/MessageBody";
import MessageSidebar from "../../components/MessageSideBar/MessageSidebar";
import ChatIcon from "@mui/icons-material/Chat";
import Navbar from "../../layout/Navbar/Navbar";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Messages = ({ setProgress }) => {
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getMessagesData();
  }, []);

  const getMessagesData = () => {
    setProgress(0); 
    axios
      .get(URL("/user/suggestion"))
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
      setProgress(100);
  };

  const handleData = (data) => {
    setInfo(data);
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="messages">
          <div className="message_left">
            <MessageSidebar user={user} handleData={handleData} />
          </div>
          <div className="message_right">
            {info ? (
              <MessageBody info={info} />
            ) : (
              <div className="messageicon">
                <div className="chaticon">
                  <ChatIcon
                    style={{ width: "50px", height: "50px", margin: "20px" }}
                  />
                </div>
                <h1>Your messages</h1>
                <h1>Send private photos and messages to a friend or group.</h1>
                <button className="smbtn">Send Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
