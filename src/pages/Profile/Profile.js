import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar"
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profile = ({setProgress}) => {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState([]);
  const [savedpost, setsavedpost] = useState([]);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowing] = useState(0);

  useEffect(() => {
    getmyposts();
  }, []);

  const getmyposts = async () => {
    setProgress(0);
    await axios
      .get(URL("/post/profile"), {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProgress(50);
        setdata(res.data[1]);
        setuser(res.data[0]);
        setsavedpost(res.data[0].savedpost);
        setProgress(75);
        setfollowers(res.data[0].followers.length);
        setfollowing(res.data[0].following.length);
      });
    setProgress(100);
  };

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
                <Route path="/" element={<Savedpost data={data} />}></Route>
              </Routes>
              <Routes>
                <Route
                  path="/saved"
                  element={<Savedpost data={savedpost} />}
                ></Route>
              </Routes>
              <Routes>
                <Route
                  path="/tagged"
                  element={<Savedpost data={data} />}
                ></Route>
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
