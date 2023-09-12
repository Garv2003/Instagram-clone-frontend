import React, { useEffect,useState } from "react";
import "./Explore.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Savedpost from "../../components/Savedpost/Savedpost";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
const Explore = ({ setProgress }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getdata();
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
