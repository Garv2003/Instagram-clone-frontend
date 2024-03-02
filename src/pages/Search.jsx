import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import ProfileBar from "../components/ProfileBar";
import Bar from "../components/Bar";
import { MagnifyingGlass } from "react-loader-spinner";
import PropTypes from "prop-types";
import axios from "axios";
import { Icon } from "../utils/iconutitls";

const Search = ({ setProgress }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Instagram Search";
    setProgress(100);
  }, [setProgress]);

  useEffect(() => {
    const debounced = setTimeout(() => {
      if (search) {
        axios
          .get(
            `${
              import.meta.env.VITE_APP_BACKEND_URL
            }/user/search?user=${search}`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            setLoading(false);
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setLoading(false);
        setUsers([]);
      }
    }, 1000);
    return () => clearTimeout(debounced);
  }, [search]);

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <Bar text="Search" />
        <div className="search">
          <div className="search_heading">
            <h3>Search</h3>
          </div>
          <input
            className="search_input1"
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLoading(true);
            }}
          />
          <div className="search_body">
            {search && users.length > 0 ? (
              users.map((user) => {
                return <ProfileBar key={user._id} post={user} />;
              })
            ) : loading ? (
              <div style={{ textAlign: "center" }}>
                <MagnifyingGlass
                  visible={true}
                  wrapperStyle={{
                    height: "180px",
                    width: "180px",
                  }}
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor="#000000"
                  color="#fafafa"
                  fontSize={100}
                />
              </div>
            ) : !search && users.length === 0 ? (
              <div className="search_name">
                <Icon
                  name="FaSearch"
                  className="search_icon"
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "20px",
                  }}
                />
                <div className="search_icon_heading">No Recent Search</div>
              </div>
            ) : (
              <div className="search_name">
                <Icon
                  name="FaSearch"
                  className="search_icon"
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "20px",
                  }}
                />
                <div className="search_icon_heading">No Results Found</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default Search;
