import React, { useState ,useE} from "react";
import Navbar from "../Navbar/Navbar";
import Posts from "../Posts/Posts";
import "./Home.css";
import Profile from "../Profile/Profile";
import Explore from "../Explore/Explore";
import Reels from "../Reels/Reels";
import Archive from "../Archive/Archive";
import axios, { Axios } from "axios";
import Setting from "../Setting/Setting";
import Notifications from "../Notifications/Notifications";
import Showprofile from "../Showprofile/Showprofile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Create from "../Create/Create";
import Showpost from "../Showpost/Showpost";
import Search from "../Search/Search";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Home = () => {
  const navigate = useNavigate();
  const uploadpost = (post) => {
    axios({
      method: "post",
      url: URL("/addpost"),
      data: {
        title: post.Title,
        ImageUrl: post.ImageUrl,
        description: post.Description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status == 200) {
        navigate("/profile");
      }
    });
  };
  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <Routes>
          <Route exact path="/profile/*" element={<Profile />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/" element={<Posts />}></Route>
          <Route path="/reels" element={<Reels />}></Route>
          <Route path="/showpost/:id" element={<Showpost />}></Route>
          <Route
            path="/create"
            element={<Create upload={uploadpost} />}
          ></Route>
          <Route path="/archive/stories/" element={<Archive />}></Route>
          <Route path="/accounts/edit" element={<Setting />}></Route>
          <Route path="/updatepost"></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/showprofile/:id" element={<Showprofile/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
