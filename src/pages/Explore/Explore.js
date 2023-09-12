import React, { useContext } from "react";
import "./Explore.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Savedpost from "../../components/Savedpost/Savedpost";
import Navbar from "../../layout/Navbar/Navbar";
import PostContext from "../../Context/Post/PostContext";

const Explore = ({ setProgress }) => {
  const { posts } = useContext(PostContext);

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="explore">
          <div className="explore_header">
            <Savedpost data={posts} />
          </div>
          <div className="explore_footer">
            <ProfileFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
