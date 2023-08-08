import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";
import "./Posts.css";
import axios from "axios";

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
    getdata();
  }, []);

  const getsuggestion = () => {
    axios.get(URL("/suggestion")).then((res) => {
      setuser(res.data);
      console.log(res.data)
    });
  };

  const getdata = async () => {
    const res = await axios.get(URL("/"));
    setPosts(res.data)
  };
  
  async function showid(id) {
    await axios
      .put(URL("/like"), {
        postid: id,
        id:localStorage.getItem("token")
      })
      .then((res) => {
        console.log(res);
      });
  }
  async function Unlike(id) {
    const res = await axios.put(URL("/unlike"), {
      postid: id,
      id:localStorage.getItem("token")
    });
  }
  const onsubmit = async (id, text) => {
    await axios
      .put(URL("/addcomment"), {
        id: id,
        text: text,
      })
      .then((res) => {
        console.log(res);
      });
  };
  console.log(user)
  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__posts">
          <div>
            {posts.map((post, i) => (
              <Post
              key={i}
                post={post}
                a={post._id}
                like={post.like}
                likes={post.likes != undefined ? post.likes.length : 0}
                user={post.User_id.username}
                postImage={post.ImageUrl}
                Showid={showid}
                unlike={Unlike}
                onsubmit={onsubmit}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions user={user}/>
      </div>
    </div>
  );
}

export default Posts;
