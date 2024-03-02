import { useEffect } from "react";
import Navbar from "../layout/Navbar/Navbar";
import ProfileFooter from "../layout/ProfileFooter/ProfileFooter";
import { Icon } from "../utils/iconutitls";
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
                <Icon name="IoArrowBack" />
                <Link className="cl" to="/profile">
                  <span> Archive</span>
                </Link>
              </button>
            </div>
            <div className="archive_header_2">
              <Icon
                name="MdOutlineRotateLeft"
                style={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
              <Link to="/archive/stories/" className="cl">
                STORIES
              </Link>
            </div>
          </div>
          <div className="archive_section">
            <div className="restoreicon">
              <Icon
                name="MdRestore"
                className="fa-plus-circle"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
            <h3>Add to your story</h3>
            <span>
              Keep your stories in your archive after they disappear, so you can
              look back on{" "}
            </span>
            <span>
              your memories. Only you can see what&apos;s in your archive.
            </span>
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
