import React, { useEffect, useState } from "react";
import "./Profile.css";
import Profile_header from "../Profile_header/Profile_header";
import Profile_footer from "../Profile_footer/Profile_footer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Reels from "../Reels/Reels";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};  

const Profile = () => {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState([]);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowing] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getmyposts();
  }, []);

  const getmyposts = async () => {
    await axios
      .get(URL("/profile"), {
        headers: {
          Authorization:localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setdata(res.data[1]);
        setuser(res.data[0]);
        if (res.data[0].followers != undefined) {
          setfollowers(res.data[0].followers.length);
        }
        if (res.data[0].following != undefined) {
          setfollowing(res.data[0].following.length);
        }
      });
  };

  return (
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
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Routes>
          <Route path="/saved" element={<Reels />}></Route>
        </Routes>
        <Routes>
          <Route path="/tagged" element={<Reels />}></Route>
        </Routes>
        <div className="explore_header">
          {data.map((post) => {
            return (
              <div className="pl-22">
                <div className="gallery-item">
                  <div>
                    <img className="profileimage" src={post.ImageUrl} alt="" />
                    <div />
                    <Link to={`/showpost/${post._id}`}>
                      <div className="gallery-item-info">
                        <ul>
                          <li className="gallery-item-likes cl">
                            <span className="visually-hidden">Likes:</span>
                            <FavoriteIcon />
                            {post.likes.length}
                          </li>
                          <li className="gallery-item-comments cl">
                            <span className="visually-hidden">Comments:</span>
                            <CommentIcon />
                            {post.comments.length}
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <Profile_footer />
      </div>
    </div>
  );
};

export default Profile;
