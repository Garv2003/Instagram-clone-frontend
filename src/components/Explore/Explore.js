import React, { useState, useEffect } from "react";
import "./Explore.css";
import Profile_footer from "../Profile_footer/Profile_footer";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
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
    const res = await axios.get(URL("/post/explore"));
    setExoposts(res.data);
  };

  return (
    <div className="explore">
      <div className="explore_header">
        {exoposts.map((post) => {
          return (
            <div className="pl-22" key={post._id}>
              <div className="gallery-item">
                <div>
                  <img className="profileimage" src={post.ImageUrl} alt="" />
                  <div />
                  <Link to={`/showpost/${post._id}`}>
                    <div className="gallery-item-info">
                      <ul>
                        <li className="gallery-item-likes cl">
                          <span className="visually-hidden">Likes:</span>{" "}
                          <FavoriteIcon />
                          {post.likes.length}
                        </li>
                        <li className="gallery-item-comments cl">
                          <span className="visually-hidden">Comments:</span>{" "}
                          <CommentIcon />{post.comments.length}
                        </li>
                      </ul>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="explore_footer">
        <Profile_footer />
      </div>
    </div>
  );
};

export default Explore;
