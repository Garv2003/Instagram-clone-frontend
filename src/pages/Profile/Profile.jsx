import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth/AuthContext";
import NoPost from "../../components/NoPost/NoPost";
import NoSavedPost from "../../components/NoSavedPost/NoSavedPost";
import NoReel from "../../components/NoReels/NoReel";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

const Profile = ({ setProgress }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const { info } = useContext(AuthContext);
  const [savedpost, setSavedpost] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/post/profile`, {
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
        console.log(error);
      }
    };

    fetchData();
    document.title = `${info.name} (@${info.username}) • Instagram photos and videos`;
  }, [setProgress]);
  return (
    <div className="home">
      <div className="navbar1">
        <Navbar />
      </div>
      <div className="posts">
        <div className="profile">
          <ProfileHeader
            User={user}
            length={data.length}
            followers={followers}
            following={following}
          />
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
            <Routes>
              <Route
                path="/"
                element={data.length ? <Savedpost data={data} /> : <NoPost />}
              />
              <Route
                path="/saved"
                element={
                  data.length ? <Savedpost data={savedpost} /> : <NoSavedPost />
                }
              />
              <Route
                path="/tagged"
                element={data.length ? <Savedpost data={data} /> : <NoReel />}
              />
            </Routes>
          </div>
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

export default Profile;
