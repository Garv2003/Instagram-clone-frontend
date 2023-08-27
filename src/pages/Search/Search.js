import React, { useState } from "react";
import "./Search.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Search = () => {
  const [Search, setsearch] = useState("");
  const [user, setuser] = useState([]);
  if(Search.length==0){
    console.log(document.querySelector(".searchbody"))
  }
  const getdata = () => {
    axios
      .get(URL(`/user/search?user=${Search}`))
      .then((res) => {
        setuser([])
        setuser(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="search">
          <div className="search_heading">Search</div>
          <form>
            <input
              className="search_input1"
              type="text"
              placeholder="search"
              onChange={(e) => {
                setsearch(e.target.value);
                getdata();
              }}
            />
          </form>
          <div className="searchbody">
            {user.map((post) => {
              return (
                <div key={post._id}>
                  {post._id != localStorage.getItem("token") ? (
                    <div className="suggestions__username">
                      <div className="username__left">
                        <Link
                          to={`/showprofile/${post._id}`}
                          className="avatar"
                        >
                          {post.profileImage ? (
                            <img
                              className="postprofileimage"
                              src={post.profileImage}
                            />
                          ) : (
                            <Avatar>{post.username[0]}</Avatar>
                          )}
                        </Link>
                        <div className="username__info">
                          <Link
                            to={`/showprofile/${post._id}`}
                            className="username cl"
                          >
                            {post.username}
                          </Link>
                          <span className="relation">New to Instagram</span>
                        </div>
                      </div>
                      <button className="follow__button"></button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
