import React from "react";
import "./Search.css";
import { Avatar } from "@mui/material";

const Search = () => {
  return (
    <div className="search">
      <div className="search_heading">Search</div>
      <form>
        <input
          className="search_input"
          type="text"
          onChange={(e) => {
            // searchpost(e.target.value)
          }}
        />
      </form>
      <div className="search_body">
        <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar>R</Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
