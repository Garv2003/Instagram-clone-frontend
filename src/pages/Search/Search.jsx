import "./Search.css";
import { useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import UseSearch from "../../Hooks/UseSearch";
import { MagnifyingGlass } from "react-loader-spinner";

const Search = ({ setProgress }) => {
  useEffect(() => {
    document.title = "Instagram Search";
    setProgress(100);
  }, [setProgress]);

  const { search, setSearch, users, loading } = UseSearch();
  return (
    <div className="home">
      <div className="navbar1">
        <Navbar />
      </div>
      <div className="posts">
        <div className="search">
          <div className="search_heading">
            <h3>Search</h3>
          </div>
          <input
            className="search_input1"
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="searchbody">
            {search && users.length > 0 ? (
              users.map((user) => {
                return <ProfileBar key={user._id} post={user} />;
              })
            ) : loading ? (
              <div style={{ textAlign: "center" }}>
                <MagnifyingGlass
                  visible={true}
                  wrapperStyle={{
                    height: "100%",
                    width: "40%",
                  }}
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor="#000000"
                  color="#fafafa"
                />
              </div>
            ) : !search && users.length === 0 ? (
              <div className="searchname">
                <SearchIcon className="search_icon" sx={{ fontSize: 150 }} />
                <div className="search_icon_heading">No Recent Search</div>
              </div>
            ) : (
              <div className="searchname">
                <SearchIcon className="search_icon" sx={{ fontSize: 150 }} />
                <div className="search_icon_heading">No Results Found</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
