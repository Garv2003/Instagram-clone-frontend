import React, { useEffect, useState } from "react";
import "./Search.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Search = () => {
  const [Search, setsearch] = useState("");
  const [user, setuser] = useState([]);

  useEffect(() => {}, []);

  const getdata = () => {
    axios
      .get(URL(`/user/search?user=${Search}`))
      .then((res) => {
        setuser(res.data);
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
          <div className="search_heading">
            <h3>Search</h3>
          </div>
          <input
            className="search_input1"
            type="text"
            placeholder="search"
            onChange={(e) => {
              setsearch(e.target.value);
              getdata();
            }}
          />
          <div className="searchbody">
            {user.length > 0 ? (
              user.map((post) => {
                return (
                  <div key={post._id}>
                    {post._id !== localStorage.getItem("token") ? (
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
                                alt="profile"
                              />
                            ) : (
                              <Avatar>{post.username[0].toUpperCase()}</Avatar>
                            )}
                          </Link>
                          <div className="username__info">
                            <Link
                              to={`/showprofile/${post._id}`}
                              className="username cl"
                            >
                              {post.username}
                            </Link>
                            <span className="relation">{post.name}</span>
                          </div>
                        </div>
                        <button className="follow__button"></button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            ) : (
              <div>
                <SearchIcon className="search_icon" sx={{ fontSize: 100 }} />
                <div>No Recent Searches</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
