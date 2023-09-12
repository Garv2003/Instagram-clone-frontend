import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import axios from "axios";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Home = ({ setProgress }) => {
  const [user, setuser] = useState([]);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getdata();
    getsuggestion();
  }, []);
  const getdata = async () => {
    const res = await axios.get(
      "http://localhost:3456/post",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setPosts(res.data);
  };
  const getsuggestion = () => {
    axios
      .get(URL("/user/suggestion"), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  };
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
