import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth/AuthContext";
import { TailSpin } from "react-loader-spinner";
import { Icon } from "../utils/iconutitls";
import LazyLoad from "react-lazy-load";

const MessageSidebar = ({ user, handleData, loading, error }) => {
  const { info } = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="message_header">
        <div>
          <div className="message_subheader">
            <Icon
              name="IoMdArrowRoundBack"
              onClick={() => navigate(-1)}
              className="back"
            />
            <div className="currentuser">
              <div>{info.username}</div>
            </div>
          </div>
          <div className="head">
            <div>Messages</div>
            <div>Requests</div>
          </div>
        </div>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#afafaf"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : error ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Icon name="MdError" />
          {error}
        </div>
      ) : (
        <div className="friends">
          {user.map((post) => {
            return (
              <div key={post._id}>
                <div className="suggestions__username">
                  <div className="username__left">
                    <Link to={`/sp/${post._id}`} className="avatar cl">
                      {post.profileImage ? (
                        <LazyLoad height={50} offset={100}>
                          <img
                            className="postprofileimage"
                            src={post.profileImage}
                            alt="profile"
                          />
                        </LazyLoad>
                      ) : (
                        <Icon name="RxAvatar" className="postprofileimage" />
                      )}
                    </Link>
                    <div className="username__info">
                      <Link to={`/sp/${post._id}`} className="username cl">
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
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

MessageSidebar.propTypes = {
  user: PropTypes.array,
  handleData: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default MessageSidebar;
