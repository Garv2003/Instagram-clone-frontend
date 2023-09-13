import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import axios from "axios";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLoader from "../../components/PostLoader/PostLoader";
const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Home = ({ setProgress }) => {
  const [user, setuser] = useState([]);
  const [posts, setPosts] = useState([]);
  const LIMIT = 5;
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setProgress(10);
    fetchData();
    getsuggestion();
    setProgress(100);
  }, []);
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3456/post?skip=${skip}&limit=${LIMIT}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setTotal(res.data.total);
    setPosts((prev) => {
      return [...prev, ...res.data.posts];
    });
    setLoading(false);
    setSkip(skip + LIMIT);
  };
  const getsuggestion = () => {
    axios
      .get(URL("/user/suggestion"), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  };
  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="timeline">
          <div className="timeline__left">
            {loading && <div style={{textAlign:"center"}}><PostLoader /></div>}
            <InfiniteScroll
            style={{ overflow: "hidden" }}
              dataLength={posts.length}
              next={fetchData}
              hasMore={posts.length < total}
              loader={
                <div style={{ textAlign: "center" }}>
                  <PostLoader />
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </InfiniteScroll>
          </div>
          <div className="timeline__right">
            <Suggestions user={user} key={user.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
