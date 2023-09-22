import React, { useEffect, useState } from "react";
import Profilebar from "../../components/Profilebar/Profilebar";
import "./Notifications.css";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Notifications = ({ setProgress }) => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
    document.title = "Instagram Notifications";
  }, []);
  
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

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="notifications">
          <div className="notifications_header">
            <h1 className="not_heading">Notifications</h1>
            <div>Activity On Your Posts</div>
            <div>
              When someone likes or comments on one of your posts, you'll see it
              here.
            </div>
            <CircleNotificationsIcon sx={{ fontSize: 100 }} />
          </div>
          <div className="not_body">
            <div className="suggestions__title">
              <div>Suggestions for you</div>
            </div>
            <div className="suggestions__usernames">
              {user.map((post) => (
                <Profilebar key={post._id} post={post} />
              ))}
            </div>
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

export default Notifications;
