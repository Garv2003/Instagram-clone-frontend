import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Reels.css";
import Profile_footer from "../Profile_footer/Profile_footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

function Reels() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await axios.get(
      URL(`/post/explore/${localStorage.getItem("token")}`)
    );
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
                {post.User_id._id != localStorage.getItem("token") ? (
                  <Post post={post} />
                ) : (
                  <div></div>
                )}
              </div>
            ))}
            <div className="explore_footer">
              <Profile_footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
