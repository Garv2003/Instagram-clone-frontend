import { useEffect } from "react";
import "./Archive.css";
import Navbar from "../../layout/Navbar/Navbar";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
import RestoreIcon from "@mui/icons-material/Restore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Link } from "react-router-dom";
import PropType from "prop-types";

const Archive = ({ setProgress }) => {
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <div className="archive">
          <div className="archive_header">
            <div className="archive_header_1">
              <button className="archive_header_button">
                <ArrowBackIcon />
                <Link className="cl" to="/profile">
                  <span> Archive</span>
                </Link>
              </button>
            </div>
            <div className="archive_header_2">
              <RotateLeftIcon />
              <Link to="/archive/stories/" className="cl">
                STORIES
              </Link>
            </div>
          </div>
          <div className="archive_section">
            <div className="restoreicon">
              <RestoreIcon className="fa-plus-circle" sx={{ fontSize: 50 }} />
            </div>
            <h3>Add to your story</h3>
            <span>
              Keep your stories in your archive after they disappear, so you can
              look back on{" "}
            </span>
            <span>your memories. Only you can see what's in your archive.</span>
          </div>
          <div className="archive_footer">
            <ProfileFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

Archive.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Archive;
