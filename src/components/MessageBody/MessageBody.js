import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Picker from "emoji-picker-react";
import axios from "axios";
import { io } from "socket.io-client";
import "./MessageBody.css";
import { AuthContext } from "../../Context/Auth/AuthContext";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const socketUrl = process.env.REACT_APP_SOCKET_URL;
// "ws://localhost:4444"
const MessageBody = ({ info }) => {
  const [User, setUser] = useState({});
  const { Id } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setarrMessage] = useState(null);
  const [Status, setStatus] = useState("offline");
  const [EmojiBox, setEmojiBox] = useState(false);
  // const socket = useRef(socketUrl);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(socketUrl, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    socket.current.on("typingResponse", (data) => {
      setStatus(data.text);
    });
    socket.current.on("getmessage", (message) => {
      setarrMessage({
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.text,
        createdAt: message.createdAt,
      });
    });
  }, []);

  useEffect(() => {
    arrMessage &&
      info?._id === arrMessage.senderId &&
      setMessages((messages) => [...messages, arrMessage]);
  }, [arrMessage, info._id]);

  useEffect(() => {
    socket.current.emit("adduser", Id);
    socket.current.on("getusers", (us) => {
      const user = us.filter((user) => user.userId === info._id);
      if (user[0]) {
        setStatus("online");
      } else {
        setStatus("offline");
      }
      setUser(user[0]);
    });
  }, [info]);

  const handleSendMessage = async () => {
    const message = {
      senderId: Id,
      receiverId: info._id,
      text: newMessage,
      createdAt: Date.now(),
    };
    if (newMessage.trim() !== "") {
      socket.current.emit("sendmessage", message);
      setMessages((messages) => [...messages, message]);
      setNewMessage("");
      await axios
        .post(`${API_URL}/message/addmessage`, {
          from: Id,
          to: info._id,
          message: newMessage,
        })
        .then((res) => {
          message = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const getmessages = async () => {
      await axios
        .post(`${API_URL}/message/getmessage`, {
          from: Id,
          to: info._id,
        })
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getmessages();
  }, [info._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleTyping = (type) => {
    socket.current.emit("typing", {
      senderId: Id,
      receiverId: info._id,
      text: type ? "typing..." : "online",
    });
  };
  return (
    <div className="messagebody">
      <div className="messagebody_top">
        <div>
          <div className="topicon">
            <div className="messagestatus">
              <Link to={`/showprofile/${info._id}`} className="avatar">
                {info.profileImage ? (
                  <img
                    className="postprofileimage"
                    src={info.profileImage}
                    alt="Profile"
                  />
                ) : (
                  <Avatar>{info.username[0]}</Avatar>
                )}
              </Link>
            </div>
            <div>{info.username}</div>
          </div>
          <div>
            <p className="status">{Status}</p>
          </div>
        </div>

        <div>
          <MoreHorizRoundedIcon />
        </div>
      </div>
      <div className="message__container">
        {messages.map((message, i) =>
          message.senderId === Id ? (
            <div className="message__chats" key={i}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={i}>
              <p>{info.username}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={scrollRef}></div>
      </div>
      <div className="messagebody_footer">
        <button onClick={() => setEmojiBox(!EmojiBox)}>
          <EmojiEmotionsIcon />
        </button>
        <button>
          <InsertPhotoIcon />
        </button>
        <div className="emoji">
          {EmojiBox && (
            <Picker
              onEmojiClick={(event) => {
                setNewMessage(newMessage + event.emoji);
                // setEmojiBox(false)
              }}
              pickerStyle={{ width: "100%" }}
            />
          )}
        </div>
        <textarea
          type="text"
          placeholder="Message..."
          value={newMessage}
          theme="dark"
          onFocus={() => {
            handleTyping(true);
            setEmojiBox(false);
          }}
          onBlur={() => handleTyping(false)}
          onKeyDown={() => handleTyping(true)}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
        <button onClick={handleSendMessage}>
          <SendRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageBody;
