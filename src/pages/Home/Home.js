import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Home = ({ setProgress }) => {
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    setProgress(0);
    getsuggestion();
    setProgress(50);
    getdata();
    setProgress(100);
  }, []);

  const getsuggestion = () => {
    axios.get(URL("/user/suggestion")).then((res) => {
      setuser(res.data);
    });
  };
  const getdata = async () => {
    const res = await axios.get(URL(`/post/${localStorage.getItem("token")}`), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPosts(res.data);
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
