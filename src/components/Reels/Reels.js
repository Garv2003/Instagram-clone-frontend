import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Reels.css";
import Profile_footer from "../Profile_footer/Profile_footer";
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
    const res = await axios.get(URL("/post/explore"));
    setPosts(res.data);
  };

  return (
    <div className="reels">
      <div className="reels_header">
        <div>
          {posts.map((post) => (
            <>
              {post.User_id._id != localStorage.getItem("token") ? (
                <Post post={post} />
              ) : (
                <div key={post._id}></div>
              )}
            </>
          ))}
        </div>
        <div className="explore_footer">
          <Profile_footer />
        </div>
      </div>
    </div>
  );
}

export default Reels;
