import React, { useState } from "react";
import "./Search.css";
import { Avatar } from "@mui/material";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Search = () => {
  const [Search, setsearch] = useState("");
  const [user, setuser] = useState([]);

  const getdata = () => {
    axios
      .post(URL("/user/search"), { key: Search })
      .then((res) => {
        console.log(res.data);
        setuser(res.data);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlechange = (value) => {
    setsearch(value);
    getdata();
  };

  return (
    <div className="search">
      <div className="search_heading">Search</div>
      <form>
        <input
          className="search_input"
          type="text"
          onChange={(e) => {
            handlechange(e.target.value);
          }}
        />
      </form>
      <div className="searchbody"> 
        {user.length > 0
          ? user.map((us) => {
              <div className="search_body">
                <div className="suggestions__username">
                  <div className="username__left">
                    <span className="avatar">
                      <Avatar>{us.username[0]}</Avatar>
                    </span>
                    <div className="username__info">
                      <span className="username">{us.username}</span>
                      <span className="relation">New to Instagram</span>
                    </div>
                  </div>
                </div>
              </div>;
            })
          : <div className="search-title">No Recent Search</div>}
      </div>
    </div>
  );
};

export default Search;
