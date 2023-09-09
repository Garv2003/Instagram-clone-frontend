import React, { useEffect, useState } from "react";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Route, Routes, Link, useParams } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar"
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";
import { Avatar } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profile = ({ setProgress }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [fol, setFol] = useState([]);

  useEffect(() => {
    setProgress(0);

    const fetchData = async () => {
      try {
        const res = await axios.get(URL(`/user/showprofile/${id}`), {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const userData = res.data[0];
        const postData = res.data[1];

        setUser(userData);
        setData(postData);
        setFollowers(userData.followers.length);
        setFol(userData.followers.includes(localStorage.getItem("token")));
        setFollowing(userData.following.length);
        setProgress(100);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, setProgress]);

  const follow = (userId) => {
    axios
      .put(URL("/user/follow"), {
        followId: userId,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setFol(true);
        setFollowers(followers + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const unfollow = (userId) => {
    axios
      .put(URL("/user/unfollow"), {
        followId: userId,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setFol(false);
        setFollowers(followers - 1);
      })
      .catch((err) => {
        console.error(err);
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
            <div className="profile_header">
              <div className="profile_header_left">
                {user.profileImage ? (
                  <img
                    className="profile_header_avatar"
                    src={user.profileImage}
                    alt="profile"
                  />
                ) : (
                  <button className="photobtn">
                    <Avatar
                      className="profile_header_avatar"
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "40px",
                      }}
                    ></Avatar>
                  </button>
                )}
              </div>
              <div className="profile_header_right">
                <div className="profile_header_icon">
                  <div className="profile_icon">
                    <span>{user.username}</span>
                    {fol ? (
                      <button
                        className="btn"
                        onClick={() => unfollow(user._id)}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button className="btn" onClick={() => follow(user._id)}>
                        Follow
                      </button>
                    )}
                    <button className="btn">
                      <Link to="/message" className="Linkcolor">
                        Message
                      </Link>
                    </button>
                    <button className="btnsetting">
                      <PersonAddIcon />
                    </button>
                  </div>
                  <div className="profile_icon">
                    <span>{data.length} post</span>
                    <span> {followers} followers </span>
                    <span> {following} following</span>
                  </div>
                  <div className="profile_icon">{user.name}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile_header_footer">
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/">
                  POSTS
                </Link>
              </button>
            </div>
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/saved">
                  Reels
                </Link>
              </button>
            </div>
            <div className="profile_header_footericon">
              <button className="profile_header_footericons">
                <Link className="linkprofile" to="/tagged">
                  TAGGED
                </Link>
              </button>
            </div>
          </div>
          <div className="profile_section">
            <div className="explore_header">
              <Routes>
                <Route path="/" element={<Savedpost data={data} />} />
                <Route path="/reels" element={<div>Reels</div>} />
                <Route path="/tagged" element={<div>Tagged</div>} />
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
