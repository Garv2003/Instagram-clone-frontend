import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../utils/iconutitls";
import Picker from "emoji-picker-react";
import axios from "axios";
import { UseAuth } from "../Context/Auth/AuthContext";
import PropType from "prop-types";
import { UseSocket } from "../Context/Socket/SocketContext";
import { RotatingLines } from "react-loader-spinner";
import TypeAnimation from "./TypeAnimation/TypeAnimation";

const MessageBody = ({ info, setInfo }) => {
  const { Id } = UseAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setarrMessage] = useState(null);
  const [Status, setStatus] = useState("Not Active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [EmojiBox, setEmojiBox] = useState(false);
  const { socket } = UseSocket();

  const scrollRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    socket.current.on("typingResponse", (data) => {
      setStatus(data.text);
      if (data.text === "Typing...") {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });
    socket.current.on("getmessage", (message) => {
      setarrMessage({
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.text,
        createdAt: message.createdAt,
      });
    });
  }, [isTyping]);

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
        setStatus("Active Now");
      } else {
        setStatus("Not Active");
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
      text: type ? "Typing..." : "Active Now",
    });

    if (newMessage.trim() === "") {
      socket.current.emit("typing", {
        senderId: Id,
        receiverId: info._id,
        text: "Online",
      });
    }
  };

  // handle image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("senderId", Id);
    formData.append("receiverId", info._id);
    formData.append("text", newMessage);
    formData.append("createdAt", Date.now());
    formData.append("file", file);
    setMessages((messages) => [
      ...messages,
      {
        senderId: Id,
        receiverId: info._id,
        text: newMessage,
        createdAt: Date.now(),
      },
    ]);
    axios
      .post("http://localhost:4444/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="messagebody">
      <div className="messagebody_top">
        <div>
          <div className="topicon">
            <Icon
              name="IoMdArrowRoundBack"
              className="back"
              onClick={() => {
                document.querySelector(".message_left").style.display = "block";
                document.querySelector(".message_right").style.display = "none";
                setInfo(null);
              }}
            />
            <div className="messagestatus">
              <Link to={`/sp/${info._id}`} className="avatar">
                {info.profileImage ? (
                  <img
                    className="postprofileimage"
                    src={info.profileImage}
                    alt="Profile"
                  />
                ) : (
                  <Icon name="RxAvatar" className="postprofileimage" />
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
          <Icon name="IoEllipsisHorizontalSharp" />
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
            <Icon name="MdError" size="5rem" className="icon" />
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
                  {/* <img
                    src={URL.createObjectURL(
                      new Blob([new Uint8Array(message?.file?.data)])
                    )}
                    alt="file"
                  /> */}
                </div>
              </div>
            ) : (
              <div className="message__chats" key={i}>
                <p>{info.username}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                  {/* <img src={message?.file?.data} alt="file" /> */}
                </div>
              </div>
            )
          )
        )}
        {isTyping && <TypeAnimation />}
        <div ref={scrollRef}></div>
      </div>
      <div className="messagebody_footer">
        <button onClick={() => setEmojiBox(!EmojiBox)}>
          <Icon name="MdEmojiEmotions" />
        </button>
        <button
          onClick={() => {
            fileRef.current.click();
          }}
        >
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => handleImage(e)}
          />
          <Icon name="MdInsertPhoto" />
        </button>
        <div className="emoji">
          {EmojiBox && (
            <Picker
              onEmojiClick={(event) => {
                setNewMessage(newMessage + event.emoji);
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
        <button onClick={handleSendMessage} className="sendBtn">
          <Icon name="IoSend" />
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

// import React, { useState, useEffect } from "react";
// import queryString from "query-string";
// import io from "socket.io-client";

// let socket;

// const Chat = ({ location }) => {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const ENDPOINT = "http://localhost:5000";

//   useEffect(() => {
//     const { name, room } = queryString.parse(document.location.search);
//     socket = io(ENDPOINT);
//     setRoom(room);
//     setName(name);

//     socket.emit("join", { name, room }, (error) => {
//       if (error) {
//         alert(error);
//       }
//     });
//   }, [document.location.search]);
//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((messages) => [...messages, message]);
//     });
//     // socket.on("roomData", ({ users }) => {
//     //   console.log(users);
//     //   setUsers(users);
//     // });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message) {
//       socket.emit("sendMessage", { message });
//       setMessage("");
//     } else alert("empty input");
//   };

//   return (
//     <div>
//       {messages.map((val, i) => {
//         return (
//           <div key={i}>
//             {val.text}
//             <br />
//             <b>{val.user}</b>
//           </div>
//         );
//       })}
//       <form action="" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <div>
//         <input
//           placeholder="Name"
//           type="text"
//           onChange={(event) => setName(event.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <input
//           placeholder="Room"
//           type="text"
//           onChange={(event) => setRoom(event.target.value)}
//           required
//         />
//       </div>
//       <Link
//         onClick={(e) => (!name || !room ? e.preventDefault() : null)}
//         to={`/chat?name=${name}&room=${room}`}
//       >
//         <button type="submit">Sign In</button>
//       </Link>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Chat from "./components/Chat";

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home/>} />
//       <Route path="/chat" element={<Chat/>} />
//     </Routes>
//   </Router>
// );

// export default App;
