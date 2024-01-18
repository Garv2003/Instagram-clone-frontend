import React, { useEffect, useState } from "react";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import { Route, Routes, NavLink, useParams } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import Savedpost from "../../components/Savedpost/Savedpost";
import axios from "axios";
import { AuthContext } from "../../Context/Auth/AuthContext";
import NoPost from "../../components/NoPost/NoPost";
import NoReel from "../../components/NoReels/NoReel";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import UseFollow from "../../Hooks/UseFollow";
import { IoPersonCircleSharp } from "react-icons/io5";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropType from "prop-types";
import UsePrev from "../../Hooks/UsePrev";
import { RotatingLines } from "react-loader-spinner";
import { MdError } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineGridOn } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";

const Profile = ({ setProgress }) => {
  const { id } = useParams();
  const { Id } = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [reels, setReels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [followArr, setFollowArr] = useState([]);
  const { follow, handleFollowAction } = UseFollow(followArr.includes(Id));
  const { prev } = UsePrev();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/showprofile/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const userData = res.data[0];
        const postData = res.data[1];
        const reelsData = res.data[2];
        console.log(userData);
        setUser(userData);
        setData(postData);
        setFollowers(userData.followers.length);
        setFollowArr(userData.followers);
        setFollowers(userData.followers.includes(Id));
        setFollowing(userData.following.length);
        setReels(reelsData);
        setProgress(100);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setProgress]);

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <div className="profile_header">
          <ArrowBackIcon
            onClick={() => {
              prev();
            }}
          />
          <div className="profile_header_center">
            <span>{user.name}</span>
            <FaChevronDown />
          </div>
          <div
            style={{
              opacity: "0",
            }}
          >
            <IoPersonAddOutline />
          </div>
        </div>
        <div className="profile">
          <header>
            <div className="header-wrap">
              <div className="profile-pic">
                <div className="profileloader">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="profile" />
                  ) : (
                    <button className="photobtn">
                      <IoPersonCircleSharp className="profile_header_avatar" />
                    </button>
                  )}
                </div>
              </div>
              <div className="profile-info">
                <div className="title row">
                  <h2>{user.username}</h2>
                  <span className="verfied-icon"></span>
                  <div className="btn_group">
                    {follow || followArr.includes(Id) ? (
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#0095F6",
                        }}
                        onClick={() => handleFollowAction(user._id, false)}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#0095F6",
                        }}
                        onClick={() => handleFollowAction(user._id, true)}
                      >
                        Follow
                      </button>
                    )}
                    <button className="btn">
                      <NavLink to="/message">Message</NavLink>
                    </button>
                  </div>
                  <div className="btnsetting">
                    <PiDotsThreeOutlineFill
                      className="btnset"
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
                <div className="desktop-only">
                  <div className="details row">
                    <ul>
                      <li>
                        <span>{data.length}</span> posts
                      </li>
                      <li>
                        <span>{followers}</span> followers
                      </li>
                      <li>
                        <span>{following}</span> following
                      </li>
                    </ul>
                  </div>
                  <div className="descriptions row last">
                    <h1>{user.name}</h1>
                    {/* <span>
                  Everyone has a story to tell.
                  <br />
                  Tag <a>#ShotoniPhone</a> to take part.
                </span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-info mobile-only">
              <div className="descriptions row">
                <h1>{user.name}</h1>
                {/* <span>
              Everyone has a story to tell.
              <br />
              Tag <a>#ShotoniPhone</a> to take part.
            </span> */}
              </div>
            </div>
          </header>
          <div className="desktop-only">
            <div className="tabs">
              <NavLink to="" className="tab-item" end>
                <div>
                  <FaRegBookmark />
                  <span>POSTS</span>
                </div>
              </NavLink>
              <NavLink to="reels">
                <div className="tab-item">
                  <BiSolidMoviePlay />
                  <span>REELS</span>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="mobile-tabs mobile-only">
            <ul>
              <li>
                <div>{data.length}</div>
                posts
              </li>
              <li>
                <div>{followers}</div>
                followers
              </li>
              <li>
                <div>{following}</div>
                following
              </li>
            </ul>
            <div className="actions">
              <NavLink to="" end>
                <MdOutlineGridOn />
              </NavLink>
              <NavLink to="reels">
                <BiSolidMoviePlay />
              </NavLink>
            </div>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                fontSize: "1.5rem",
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
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                minHeight: "50vh",
                fontSize: "2rem",
              }}
            >
              <MdError />
              {error}
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={data.length ? <Savedpost data={data} /> : <NoPost />}
              />

              <Route
                path="/reels"
                element={reels.length ? <Savedpost data={reels} /> : <NoReel />}
              />
            </Routes>
          )}

          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  setProgress: PropType.func,
};

export default Profile;
