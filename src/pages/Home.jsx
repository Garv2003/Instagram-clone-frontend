import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar/Navbar";
import axios from "axios";
import Post from "../components/Post";
import Suggestions from "../layout/Suggestions/Suggestions";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallNavbar from "../layout/SmallNavbar/SmallNavbar";
import Right_Logo from "../assets/Right_Logo.png";
import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

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
    document.title = "Instagram Home";
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/post?skip=${skip}&limit=${LIMIT}`,
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
    setSkip(skip + LIMIT);
    setLoading(false);
  };

  const getsuggestion = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/suggestion`, {
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
            {!loading && (
              <div className="caught_up">
                <div className="caught_img">
                  <img src={Right_Logo} alt="" />
                </div>
                <h3>You&apos;re all caught up</h3>
                <span>You&apos;ve seen all new posts</span>
              </div>
            )}
            <div className="postbox">
              <InfiniteScroll
                style={{ overflow: "hidden" }}
                dataLength={posts.length}
                next={fetchData}
                hasMore={posts.length < total}
                loader={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RotatingLines
                      strokeColor="#fafafa"
                      strokeWidth="4"
                      height="80"
                      width="80"
                    />
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
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <RotatingLines
                  strokeColor="#fafafa"
                  strokeWidth="4"
                  height="80"
                  width="80"
                />
              </div>
            )}
          </div>
          <div className="timeline__right">
            <Suggestions
              user={user}
              key={user.length}
              setProgress={setProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default Home;

{
  /* <InfiniteScroll
                style={{ overflow: "hidden" }}
                dataLength={posts.length}
                next={fetchData}
                hasMore={posts.length < total}
                // scrollThreshold={0.9}
                loader={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RotatingLines
                      strokeColor="#fafafa"
                      strokeWidth="4"
                      height="80"
                      width="80"
                    />
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
              </InfiniteScroll> */
}
