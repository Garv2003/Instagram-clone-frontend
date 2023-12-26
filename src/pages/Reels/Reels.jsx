import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./Reels.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
import Bar from "../../components/Bar/Bar";

function Reels({ setProgress }) {
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    setProgress(10);
    getdata();
    setProgress(50);
    document.title = "Instagram Reels";
    setProgress(100);
  }, [setProgress]);
  const getdata = async () => {
    const res = await axios.get(`${API_URL}/post/explore`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    setPosts(res.data);
  };

  return (
    <div className="home">
        <Navbar />
      <div className="posts">
        <Bar text="Reels" />
        <div className="reels">
          <div className="postbox">
            {posts.map((post) => (
              <div key={post._id}>
                <Post post={post} />
              </div>
            ))}
            <div className="explore_footer">
              <ProfileFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
