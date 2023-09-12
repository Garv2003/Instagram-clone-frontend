import React from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";
import UserContext from "../../Context/User/UserContext";
import PostContext from "../../Context/Post/PostContext";

const Home = ({ setProgress }) => {
  setProgress(0);
  const { posts } = React.useContext(PostContext);
  const { user } = React.useContext(UserContext);
  setProgress(100);
  
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
