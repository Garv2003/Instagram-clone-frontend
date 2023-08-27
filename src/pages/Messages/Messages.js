import React, { useEffect, useState } from "react";
import "./Messages.css";
import axios from "axios";
import MessageBody from "../../components/MessageBody/MessageBody";
import MessageSidebar from "../../components/MessageSideBar/MessageSidebar";
import ChatIcon from "@mui/icons-material/Chat";
import Navbar from "../../components/Navbar/Navbar";
const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Mesages = () => {
  const [user, setuser] = useState([]);
  const [info, setinfo] = useState();

  useEffect(() => {
    getuser();
  }, []);

  const getuser = () => {
    axios
      .get(URL("/user/suggestion"))
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handledata = (data) => {
    setinfo(data);
    console.log(info);
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="messages">
          <div className="message_left">
            <MessageSidebar user={user} handledata={handledata} />
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

export default Mesages;
