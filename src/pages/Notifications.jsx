import { useEffect, useState } from "react";
import ProfileBar from "../components/ProfileBar";
import Navbar from "../layout/Navbar/Navbar";
import axios from "axios";
import { Icon } from "../utils/iconutitls";
import Bar from "../components/Bar";
import PropType from "prop-types";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

const Notifications = ({ setProgress }) => {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getsuggestion();
    document.title = "Instagram Notifications";
    getNotifications();
    setLoading(false);
  }, [setProgress]);

  const getsuggestion = () => {
    try {
      setProgress(20);
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
      setProgress(100);
    } catch (error) {
      setError(error.message);
    }
  };

  const getNotifications = () => {
    try {
      setProgress(20);
      axios
        .get(`${API_URL}/user/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setNotification(res.data.notifications);
        });
      setProgress(100);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <Bar text="" />
        <div className="notifications">
          <div className="notifications_header">
            <h1 className="not_heading">Notifications</h1>
            <div>Activity On Your Posts</div>
          </div>
          <div className="notifications_list">
            {notification.length === 0 ? (
              <>
                <div>
                  When someone likes or comments on one of your posts,
                  you&apos;ll see it here.
                </div>
                <Icon
                  name="MdCircleNotifications"
                  style={{ fontSize: "100px", margin: "auto" }}
                />
              </>
            ) : (
              <div className="suggestions__usernames">
                {notification.map((post) => (
                  <div key={post._id}>
                    <div className="suggestions__username">
                      <div className="username__left">
                        <Link to={`/sp/${post._id}`} className="avatar cl">
                          {post.profileImage ? (
                            <LazyLoad>
                              <img
                                className="postprofileimage"
                                src={post.user.profileImage}
                                alt="profile"
                              />
                            </LazyLoad>
                          ) : (
                            <Icon
                              name="RxAvatar"
                              style={{
                                fontSize: "40px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </Link>
                        <div className="username__info">
                          <Link
                            to={`/sp/${post.user._id}`}
                            className="username cl"
                          >
                            {post.user.username}
                          </Link>
                        </div>
                      </div>
                      <div className="username__right">
                        {post.type === "like" &&
                          `${post.user.username} liked your post`}
                        {post.type === "comment" &&
                          `${post.user.username} commented on your post`}
                        {post.type === "follow" &&
                          `${post.user.username} started following you`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="not_body">
            <div className="suggestions__title">
              <div>Suggestions for you</div>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "40vh",
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
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                  minHeight: "40vh",
                  fontSize: "2rem",
                }}
              >
                <Icon name="MdError" style={{ fontSize: "3.5rem" }} />
                {error}
              </div>
            ) : (
              <div
                className="suggestions__usernames"
                style={{
                  maxHeight: "20vh",
                  height: "auto",
                  minHeight: "40vh",
                }}
              >
                {user.map((post) => (
                  <ProfileBar key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
          <div className="notifications_footer">
            <div className="footer_icons">
              <div>About</div>
              <div>Help</div>
              <div>Press</div>
              <div>API</div>
              <div>Jobs</div>
              <div>Privacy</div>
              <div>Terms </div>
            </div>
            <div className="footer_icons">
              <div>Locations</div>
              <div>Language</div>
              <div>English</div>
              <div> Meta Verified</div>
            </div>
            <div className="high">© 2023 INSTAGRAM FROM META</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Notifications;
