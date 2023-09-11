import React, { useState, useEffect } from "react";
import "./Explore.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Savedpost from "../../components/Savedpost/Savedpost";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
const Explore = ({ setProgress }) => {
  const [exoposts, setExoposts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await axios.get(
      URL(`/post/explore/${localStorage.getItem("token")}`),
      {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setProgress(0);
    setExoposts(res.data);
    setProgress(100);
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="explore">
          <div className="explore_header">
            <Savedpost data={exoposts} />
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