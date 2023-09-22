import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Reels.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
function Reels({ setProgress }) {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    getdata();
    document.title = "Instagram Reels";
  }, []);
  const getdata = async () => {
    const res = await axios.get(`${API_URL}/post/explore`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
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
        <div className="reels">
          <div className="reels_header">
            {posts.map((post) => (
              <div key={post._id}>
                <Post post={post} />
              </div>
            ))}
            <div className="explore_footer">
              <ProfileFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
