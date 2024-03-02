import { useEffect, useState } from "react";
import ReelBox from "../components/ReelBox";
import Navbar from "../layout/Navbar/Navbar";
import axios from "axios";
import Bar from "../components/Bar";
import PropType from "prop-types";
import { RotatingLines } from "react-loader-spinner";
import { Icon } from "../utils/iconutitls";
function Reels({ setProgress }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const LIMIT = 5;
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setProgress(10);
    getdata();
    document.title = "Instagram Reels";
    setProgress(100);
  }, [setProgress]);

  const getdata = async () => {
    try {
      await axios
        .get(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/post/reels?limit=${LIMIT}&skip=${skip} 
        `,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setPosts(res.data.posts);
          setTotal(res.data.total);
          setSkip(skip + LIMIT);
          setLoading(false);
        });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="home">
        <Navbar />
        <div className="posts">
          <Bar text="Reels" />
          <div className="reels">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "90vh",
                }}
              >
                <RotatingLines
                  strokeColor="#fafafa"
                  strokeWidth="4"
                  height="80"
                  width="80"
                />
              </div>
            ) : error ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  minHeight: "90vh",
                }}
              >
                <Icon name="MdError" size="5rem" color="#fafafa" />
                <h1 style={{ color: "#fafafa", marginLeft: "1rem" }}>
                  {error}
                </h1>
              </div>
            ) : (
              <div>
                <div className="postBox">
                  {posts.map((post, i) => (
                    <ReelBox post={post} key={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Reels.propTypes = {
  setProgress: PropType.func,
};

export default Reels;
