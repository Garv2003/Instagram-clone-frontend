import React from "react";
import { Link } from "react-router-dom";
import Profilebar from "../../components/Profilebar/Profilebar";
import "./Suggestions.css";

function Suggestions(props) {
  const { user } = props;

  return (
    <div className="suggestions">
      <div className="suggestions__title">
        <div>Suggestions for you</div>
        <Link to="/notifications" className="seeall">
          See All
        </Link>
      </div>
      <div className="suggestions__usernames">
        <div className="usersuggestions">
          {user.map((post) => (
            <Profilebar post={post} key={post._id} />
          ))}
        </div>
      </div>
      <div className="suggestion_footer">
        <div className="suggestion_icons">
          <div>About</div>.<div>Help</div>.<div>Press</div>.<div>API</div>.
          <div>Jobs</div>.<div>Privacy</div>.<div>Terms</div>.
          <div>Locations</div>.<div>Language</div>.<div>English</div>.
          <div>Meta Verified</div>
        </div>
        <div>© 2023 INSTAGRAM FROM META</div>
      </div>
    </div>
  );
}

export default Suggestions;
