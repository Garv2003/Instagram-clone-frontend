import React, { useEffect, useState } from "react";
import Profile_footer from "../Profile_footer/Profile_footer";
import { Route, Routes, Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Profile = () => {
  const [data, setdata] = useState([]);
  const [User, setuser] = useState([]);
  const [followers, setfollowers] = useState(0);
  const [following, setfollowing] = useState(0);
  const [fol,setfole]=useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    getmyposts();
  }, []);

  const follow = (userid) => {
    setfole([...fol,userid])
    axios
      .put(URL("/follow"), {
        followId: userid,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollow = (userid) => {
    axios
      .put(URL("/unfollow"), {
        followId: userid,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getmyposts = async () => {
    await axios
      .get(URL(`/showprofile/${id}`), {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setdata(res.data[1]);
        setuser(res.data[0]);
        if (res.data[0].followers != undefined) {
          setfollowers(res.data[0].followers.length);
          setfole(res.data[0].followers)
          console.log(fol)
        }
        if (res.data[0].following != undefined) {
          setfollowing(res.data[0].following.length);
        }
      });
  };

  return (
    <div className="profile">
      <div>
        <div className="profile_header">
          <div className="profile_header_left">
            {User.profileImage ? (
              <img className="profile_header_avatar" src={User.profileImage} />
            ) : (
              <button className="photobtn">
                <Avatar
                  className="profile_header_avatar"
                  style={{ width: "150px", height: "150px", margin: "40px" }}
                ></Avatar>
              </button>
            )}
          </div>
          <div className="profile_header_right">
            <div className="profile_header_icon">
              <div className="profile_icon">
                <span>{User.username}</span>
                {fol.includes(localStorage.getItem("token"))?<button className="btn" onClick={()=>unfollow(User._id)}>Unfollow</button>:<button className="btn" onClick={()=>follow(User._id)}>Follow</button>}
                <button className="btn">
                  <Link to="/archive/stories/" className="Linkcolor">
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
              <div className="profile_icon">{User.name}</div>
            </div>
          </div>
        </div>
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
              Reels
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
          <Route path="/reels"></Route>
        </Routes>
        <Routes>
          <Route path="/tagged"></Route>
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