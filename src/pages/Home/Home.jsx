import { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import "./Home.css";
import axios from "axios";
import Post from "../../components/Post/Post";
import Suggestions from "../../layout/Suggestions/Suggestions";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLoader from "../../components/PostLoader/PostLoader";
import SmallNavbar from "../../layout/SmallNavbar/SmallNavbar";
const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

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
    setProgress(50);
    getsuggestion();
    setProgress(100);
    setLoading(false);
    document.title = "Instagram Home";
  }, [setProgress]);

  const fetchData = async () => {
    const res = await axios.get(`${API_URL}/post?skip=${skip}&limit=${LIMIT}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    setTotal(res.data.total);
    setPosts((prev) => {
      return [...prev, ...res.data.posts];
    });
    setSkip(skip + LIMIT);
  };
  const getsuggestion = () => {
    axios
      .get(`${API_URL}/user/suggestion`, {
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
      <Navbar />
      <div className="posts">
        <SmallNavbar />
        <div className="timeline">
          <div
            className="timeline__left"
            style={{ maxWidth: "630px", width: "100%" }}
          >
            <div className="postbox">
              {loading && (
                <div style={{ textAlign: "center" }}>
                  <PostLoader />
                </div>
              )}
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
                  <p style={{ textAlign: "center", marginBottom: "20px" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {posts.map((post, i) => (
                  <Post post={post} key={i} />
                ))}
              </InfiniteScroll>
            </div>
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
