import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Reels.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Navbar from "../../layout/Navbar/Navbar"
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

function Reels({ setProgress }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setProgress(0);
    const res = await axios.get(
      URL(`/post/explore/${localStorage.getItem("token")}`)
    );
    setProgress(50);
    setPosts(res.data);
    setProgress(100);
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
                {post.User_id._id !== localStorage.getItem("token") ? (
                  <Post post={post} />
                ) : (
                  <div></div>
                )}
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
