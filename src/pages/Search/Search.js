import "./Search.css";
import Navbar from "../../layout/Navbar/Navbar"
import SearchIcon from "@mui/icons-material/Search";
import Profilebar from "../../components/Profilebar/Profilebar";
import UseSearch from "../../Hooks/UseSearch";
const Search = ({setProgress}) => {
  setProgress(100);
  document.title = "Instagram Search";
  const { search, setSearch, users } = UseSearch();
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
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="searchbody">
            {users.length > 0 ? (
              users.map((user) => {
                return <Profilebar key={user._id} post={user} />;
              })
            ) : (
              <div className="searchname">
                <SearchIcon className="search_icon" sx={{ fontSize: 100 }} />
                <div>No Recent Searches</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
