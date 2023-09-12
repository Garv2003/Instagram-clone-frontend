import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Reels.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Navbar from "../../layout/Navbar/Navbar";
import PostContext from "../../Context/Post/PostContext";

function Reels({ setProgress }) {
  const { posts } = React.useContext(PostContext);

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
