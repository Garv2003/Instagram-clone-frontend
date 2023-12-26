import { useEffect, useState } from "react";
import "./Explore.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import Savedpost from "../../components/Savedpost/Savedpost";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
import Bar from "../../components/Bar/Bar";

const Explore = ({ setProgress }) => {
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_APP_BACKEND_URL;
  useEffect(() => {
    setProgress(10);
    getdata();
    setProgress(50);
    document.title = "Instagram Explore";
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
        <Bar text="Explore" />
        <div className="explore">
          <Savedpost data={posts} />
          <div className="explore_footer">
            <ProfileFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
