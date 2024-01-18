import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import Picker from "emoji-picker-react";
import axios from "axios";
import "./MessageBody.css";
import { UseAuth } from "../../Context/Auth/AuthContext";
import PropType from "prop-types";
import { IoMdArrowRoundBack } from "react-icons/io";
import { UseSocket } from "../../Context/Socket/SocketContext";
import { RotatingLines } from "react-loader-spinner";
import { MdError } from "react-icons/md";

const MessageBody = ({ info, setInfo }) => {
  const { Id } = UseAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setarrMessage] = useState(null);
  const [Status, setStatus] = useState("Offline");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [EmojiBox, setEmojiBox] = useState(false);
  const { socket } = UseSocket();

  const scrollRef = useRef();

  useEffect(() => {
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
    });
  }, [info]);

  const handleSendMessage = async () => {
    let message = {
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
        .post(`${import.meta.env.VITE_APP_BACKEND_URL}/message/addmessage`, {
          from: Id,
          to: info._id,
          message: newMessage,
        })
        .then(() => {
          message = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const getmessages = async () => {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_APP_BACKEND_URL}/message/getmessage`, {
          from: Id,
          to: info._id,
        })
        .then((res) => {
          setMessages(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
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
      text: type ? "Typing..." : "Online",
    });
  };

  return (
    <div className="messagebody">
      <div className="messagebody_top">
        <div>
          <div className="topicon">
            <IoMdArrowRoundBack
              className="back"
              onClick={() => {
                document.querySelector(".message_left").style.display = "block";
                document.querySelector(".message_right").style.display = "none";
                setInfo(null);
              }}
            />
            <div className="messagestatus">
              <Link to={`/showprofile/${info._id}`} className="avatar">
                {info.profileImage ? (
                  <img
                    className="postprofileimage"
                    src={info.profileImage}
                    alt="Profile"
                  />
                ) : (
                  <RxAvatar className="postprofileimage" />
                )}
              </Link>
            </div>
            <div className="messagestatus">
              <div>{info.username}</div>
              <p className="status">{Status}</p>
            </div>
          </div>
        </div>

        <div>
          <IoEllipsisHorizontalSharp />
        </div>
      </div>
      <div className="message__container">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90vh",
            }}
          >
            <RotatingLines
              strokeColor="#fafafa"
              strokeWidth="4"
              height="80"
              width="80"
            />
          </div>
        ) : error ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90vh",
            }}
          >
            <MdError
              size="5rem"
              style={{
                color: "#fafafa",
              }}
            />
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90vh",
              gap: "10px",
              fontSize: "1.5rem",
            }}
          >
            No Messages{" "}
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              Start Typing to Start a Conversation
            </span>
          </div>
        ) : (
          messages.map((message, i) =>
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
          )
        )}
        <div ref={scrollRef}></div>
      </div>
      <div className="messagebody_footer">
        <button onClick={() => setEmojiBox(!EmojiBox)}>
          <MdEmojiEmotions />
        </button>
        <button>
          <MdInsertPhoto />
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
          <IoSend />
        </button>
      </div>
    </div>
  );
};

MessageBody.propTypes = {
  info: PropType.object,
  setInfo: PropType.func,
};

export default MessageBody;
