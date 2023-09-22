import React from "react";
import { Link } from "react-router-dom";
import Profilebar from "../../components/ProfileBar/ProfileBar";
import "./Suggestions.css";
import { AuthContext } from "../../Context/Auth/AuthContext";
function Suggestions(props) {
  const { user } = props;
  const { Id } = React.useContext(AuthContext);
  return (
    <div className="suggestions">
      {user.map((post) => (
        <div key={post._id}>
          {post._id === Id ? (
            <div className="suggestions__username">
              <div className="username__left">
                <Link to="/profile" className="avatar cl">
                  {post.profileImage ? (
                    <img
                      className="postprofileimage"
                      src={post.profileImage}
                      alt="profile"
                    />
                  ) : (
                    <div></div>
                  )}
                </Link>
                <div className="username__info">
                  <Link to="/profile" className="username cl">
                    {post.username}
                  </Link>
                </div>
              </div>
              {/* <button className="follow__button">Follow</button> */}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
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
