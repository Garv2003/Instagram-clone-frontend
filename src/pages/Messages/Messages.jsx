import { useEffect, useState } from "react";
import "./Messages.css";
import axios from "axios";
import MessageBody from "../../components/MessageBody/MessageBody";
import MessageSidebar from "../../components/MessageSideBar/MessageSidebar";
import ChatIcon from "@mui/icons-material/Chat";
import Navbar from "../../layout/Navbar/Navbar";
import PropType from "prop-types";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

const Messages = ({ setProgress }) => {
  const [info, setInfo] = useState(null);
  const [user, setuser] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    setProgress(10);
    document.title = "Inbox • Chats";
    setProgress(50);
    getsuggestion();
    setProgress(100);
  }, [setProgress]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const getsuggestion = () => {
    axios

      .get(`${API_URL}/user/suggestion`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  };

  const handleData = (data) => {
    setInfo(data);
  };

  return (
    <div className="home">
      <Navbar width={windowWidth} />
      <div className="posts">
        <div className="messages">
          <div className="message_left">
            <MessageSidebar user={user} handleData={handleData} />
          </div>
          <div className="message_right">
            {info ? (
              <MessageBody info={info} setInfo={setInfo} />
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

Messages.propTypes = {
  setProgress: PropType.func,
};

export default Messages;
