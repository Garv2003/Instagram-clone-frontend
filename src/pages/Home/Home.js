import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";
import axios from "axios";
import { useContext } from "react";
import PostContext from "../../Context/Post/PostContext";
import UserContext from "../../Context/User/UserContext";

const Home = ({ setProgress }) => {
  const {user,setuser} = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="timeline">
          <div className="timeline__left">
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
          <div className="timeline__right">
            <Suggestions user={user} key={user.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
