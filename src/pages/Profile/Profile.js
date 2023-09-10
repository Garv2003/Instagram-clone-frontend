import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";

const apiEndpoint = (path) => `http://localhost:3456${path}`;

const Profile = ({ setProgress }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [savedpost, setSavedpost] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint("/post/profile"), {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProgress(0);
        const responseData = response.data;
        setData(responseData[1]);
        setUser(responseData[0]);
        setSavedpost(responseData[0].savedpost);
        setFollowers(responseData[0].followers.length);
        setFollowing(responseData[0].following.length);
        setProgress(100);
      } catch (error) {
        // Handle error appropriately
      }
    };

    fetchData();
  }, [setProgress]);

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="profile">
          <div>
            <ProfileHeader
              User={user}
              length={data.length}
              followers={followers}
              following={following}
            />
          </div>
          <div className="profile_header_footer">
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/profile">
                  POSTS
                </Link>
              </button>
            </div>
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/profile/saved">
                  SAVED
                </Link>
              </button>
            </div>
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/profile/tagged">
                  REELS
                </Link>
              </button>
            </div>
          </div>
          <div className="profile_section">
            <div className="explore_header">
              <Routes>
                <Route path="/" element={<Savedpost data={data} />} />
                <Route path="/saved" element={<Savedpost data={savedpost} />} />
                <Route path="/tagged" element={<Savedpost data={data} />} />
              </Routes>
            </div>
          </div>
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

export default Profile;
