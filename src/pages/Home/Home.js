import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";
import Suggestions from "../../components/Suggestions/Suggestions";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
    getdata();
  }, []);

  const getsuggestion = () => {
    axios.get(URL("/user/suggestion")).then((res) => {
      setuser(res.data);
    });
  };
  const getdata = async () => {
    const res = await axios.get(URL(`/post/${localStorage.getItem("token")}`));
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
              <Post post={post}/>
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
