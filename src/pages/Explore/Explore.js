import React, { useState, useEffect } from "react";
import "./Explore.css";
import Profile_footer from "../Profile_footer/Profile_footer";
import Savedpost from "../../components/Savedpost/Savedpost";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};
const Explore = () => {
  const [exoposts, setExoposts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await axios.get(
      URL(`/post/explore/${localStorage.getItem("token")}`),
      {}
    );
    setExoposts(res.data);
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="explore">
          <div className="explore_header">
           <Savedpost data={exoposts}/>
          </div>
          <div className="explore_footer">
            <Profile_footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
