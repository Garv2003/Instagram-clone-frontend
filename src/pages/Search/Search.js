import "./Search.css";
import Navbar from "../../layout/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import UseSearch from "../../Hooks/UseSearch";
import PostLoader from "../../components/PostLoader/PostLoader";

const Search = ({ setProgress }) => {
  // setProgress(100);
  document.title = "Instagram Search";
  const { search, setSearch, users, loading } = UseSearch();
  return (
    <div className="home">
      <div className="navbar">
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
                <PostLoader />
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
