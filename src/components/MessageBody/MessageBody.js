import React from "react";
import "./MessageBody.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const MessageBody = ({ info }) => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setarrMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:4444");
    socket.current.on('typingResponse', (data) => {
      console.log(data);
      setTyping(true);
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
    socket.current.emit("adduser", localStorage.getItem("token"));
    socket.current.on("getusers", (us) => {
      // console.log(us);
    });
  }, [info]);

  const handleSendMessage = async () => {
    const message = {
      senderId: localStorage.getItem("token"),
      receiverId: info._id,
      text: newMessage,
      createdAt: Date.now(),
    };
    if (newMessage.trim() !== "") {
      socket.current.emit("sendmessage", message);
      setMessages((messages) => [...messages, message]);
      setNewMessage("");
      const response = await axios
        .post(URL("/message/addmessage"), {
          from: localStorage.getItem("token"),
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
        .post(URL("/message/getmessage"), {
          from: localStorage.getItem("token"),
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

  const handleTyping = () => {
    socket.current.emit("typing",{
      senderId: localStorage.getItem("token"),
      receiverId: info._id,
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
                  <img className="postprofileimage" src={info.profileImage} />
                ) : (
                  <Avatar>{info.username[0]}</Avatar>
                )}
              </Link>
            </div>
            <div>{info.username}</div>
          </div>
          <div>
            <p className="status">{typing ? "typing":"online"}</p>
          </div>
        </div>

        <div>
          <MoreHorizRoundedIcon />
        </div>
      </div>
      <div className="message__container">
        {messages.map((message, i) =>
          message.senderId === localStorage.getItem("token") ? (
            <div className="message__chats" key={i}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{info.username}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={scrollRef}></div>
        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>

      <div className="messagebody_footer">
        <textarea
          type="text"
          placeholder="Message..."
          value={newMessage}
          onKeyDown={handleTyping}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        {/* <span>
          <Picker/>
        </span> */}
        <button onClick={handleSendMessage}>
          <SendRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageBody;
