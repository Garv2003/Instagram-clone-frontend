import React from "react";
import "./MessageSidebar.css";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../../Context/Auth/AuthContext";

const MessageSidebar = ({ user, handleData }) => {
  const { Id } = React.useContext(AuthContext);
  return (
    <>
      <div className="message_header">
        <div>
          <div className="currentuser">
            {user.map((post) => {
              return (
                <div key={post._id}>
                  {post._id === Id? (
                    <div>{post.username}</div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
          <div className="head">
            <div>Messages</div>
            <div>Requests</div>
          </div>
        </div>
      </div>
      <div className="friends">
        {user.map((post) => {
          return (
            <div key={post._id}>
              {post._id !== Id ? (
                <div className="suggestions__username">
                  <div className="username__left">
                    <Link to={`/sp/${post._id}`} className="avatar cl">
                      {post.profileImage ? (
                        <img
                          className="postprofileimage"
                          src={post.profileImage}
                          alt="profile"
                        />
                      ) : (
                        <AccountCircle sx={{fontSize:35}}/>
                      )}
                    </Link>
                    <div className="username__info">
                      <Link
                        to={`/sp/${post._id}`}
                        className="username cl"
                      >
                        {post.username}
                      </Link>
                      <span className="relation">New to Instagram</span>
                    </div>
                  </div>
                  <button
                    className="follow__button"
                    onClick={() => {
                      handleData(post);
                    }}
                  >
                    Message
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessageSidebar;
