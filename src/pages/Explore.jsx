import { useEffect, useState } from "react";
import ProfileFooter from "../layout/ProfileFooter/ProfileFooter";
import Savedpost from "../components/Savedpost";
import Navbar from "../layout/Navbar/Navbar";
import axios from "axios";
import Bar from "../components/Bar";
import PropType from "prop-types";
import { RotatingLines } from "react-loader-spinner";
import { Icon } from "../utils/iconutitls";

const Explore = ({ setProgress }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProgress(10);
    getdata();
    setProgress(50);
    document.title = "Instagram Explore";
    setProgress(100);
  }, [setProgress]);
  const getdata = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_APP_BACKEND_URL}/post/explore`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <Bar text="Explore" />
        <div className="explore">
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
                gap: "10px",
                alignItems: "center",
                minHeight: "50vh",
                fontSize: "2rem",
              }}
            >
              <Icon name="MdError" />
              {error}
            </div>
          ) : (
            <Savedpost data={posts} />
          )}
          <div className="explore_footer">
            <ProfileFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

Explore.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Explore;
