import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";
import "./Posts.css";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
    getdata();
  }, []);

  const getsuggestion = () => {
    axios.get(URL("/user/suggestion")).then((res) => {
      setuser(res.data);
    });
  };
  const getdata = async () => {
    const res = await axios.get(URL("/post"));
    setPosts(res.data);
  };

  return (
    <div className="timeline">
      <div className="timeline__left">
        {posts.map((post) => (
          <div>
            {post.User_id._id != localStorage.getItem("token") ? (
              <Post post={post} />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="timeline__right">
        <Suggestions user={user} key={user.length}/>
      </div>
    </div>
  );
}

export default Posts;
