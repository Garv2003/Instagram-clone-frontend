import React, { useEffect, useState } from "react";
import "./Profile.css";
import Profile_header from "../../components/Profile_header/Profile_header";
import Profile_footer from "../Profile_footer/Profile_footer";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profile = () => {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState([]);
  const [savedpost, setsavedpost] = useState([]);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowing] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getmyposts();
  }, []);

  const getmyposts = async () => {
    await axios
      .get(URL("/post/profile"), {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setdata(res.data[1]);
        setuser(res.data[0]);
        setsavedpost(res.data[0].savedpost);
        if (res.data[0].followers != undefined) {
          setfollowers(res.data[0].followers.length);
        }
        if (res.data[0].following != undefined) {
          setfollowing(res.data[0].following.length);
        }
      });
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="profile">
          <div>
            <Profile_header
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
                  TAGGED
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
          <Profile_footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
