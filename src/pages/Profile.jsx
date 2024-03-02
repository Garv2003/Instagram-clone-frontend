import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileFooter from "../layout/ProfileFooter/ProfileFooter";
import { NavLink, Route, Routes } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Savedpost from "../components/Savedpost";
import NoPost from "../components/NoPost";
import PropType from "prop-types";
import { UseAuth } from "../Context/Auth/AuthContext";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Icon } from "../utils/iconutitls";

const Profile = ({ setProgress }) => {
  const { followers, following, info } = UseAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [savedpost, setSavedpost] = useState([]);
  const [profileloading, setprofileLoading] = useState(true);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    if (info) {
      document.title = `${info.name} (@${info.username}) • Instagram photos and videos`;
    }
    setProgress(100);
  }, [document.title, setProgress, info]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/post/profile`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const responseData = response.data;
        setData(responseData[1]);
        setSavedpost(responseData[0].savedpost);
        setprofileLoading(false);
        setReels(responseData[2]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [info]);

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <div className="profile_header">
          <NavLink to="/accounts/edit">
            <Icon name="IoIosSettings" className="icon" />
          </NavLink>
          <div className="profile_header_center">
            <span>{info.name}</span>
            <Icon name="FaChevronDown" />
          </div>
          <div>
            <NavLink to="/notifications">
              <Icon name="IoPersonAddOutline" className="icon" />
            </NavLink>
          </div>
        </div>
        <div className="profile">
          <ProfileHeader
            User={info}
            length={data.length}
            followers={followers.length}
            following={following.length}
          />
          <div className="desktop-only">
            <div className="tabs">
              <NavLink to="" className="tab-item" end>
                <div>
                  <Icon name="MdOutlineGridOn" />
                  <span>POSTS</span>
                </div>
              </NavLink>
              <NavLink to="saved">
                <div className="tab-item">
                  <Icon name="FaRegBookmark" />
                  <span>Saved</span>
                </div>
              </NavLink>
              <NavLink to="reels">
                <div className="tab-item">
                  <Icon name="BiSolidMoviePlay" />
                  <span>Reels</span>
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
                <div>{followers.length}</div>
                followers
              </li>
              <li>
                <div>{following.length}</div>
                following
              </li>
            </ul>
            <div className="actions">
              <NavLink to="" end>
                <Icon name="MdOutlineGridOn" />
              </NavLink>
              <NavLink to="saved">
                <Icon name="FaRegBookmark" />
              </NavLink>
              <NavLink to="reels">
                <Icon name="BiSolidMoviePlay" />
              </NavLink>
            </div>
          </div>

          {profileloading ? (
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
              <Icon name="MdError" />
              {error}
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  data.length ? <Savedpost data={data} /> : <NoPost index={0} />
                }
              />
              <Route
                path="/saved"
                element={
                  savedpost.length ? (
                    <Savedpost data={savedpost} />
                  ) : (
                    <NoPost index={1} />
                  )
                }
              />
              <Route
                path="/reels"
                element={
                  reels.length ? (
                    <Savedpost data={reels} />
                  ) : (
                    <NoPost index={2} />
                  )
                }
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
  setProgress: PropType.func.isRequired,
};

export default Profile;
