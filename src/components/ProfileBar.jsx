import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth/AuthContext";
import { Icon } from "../utils/iconutitls";
import UseFollow from "../Hooks/UseFollow";
import PropType from "prop-types";
import LazyLoad from "react-lazy-load";

const Profilebar = ({ post }) => {
  const { Id } = useContext(AuthContext);
  const { follow, handleFollowAction } = UseFollow(post.followers.includes(Id));

  return (
    <div key={post._id}>
      <div className="suggestions__username">
        <div className="username__left">
          <Link to={`/sp/${post._id}`} className="avatar cl">
            {post.profileImage ? (
              <LazyLoad>
                <img
                  className="postprofileimage"
                  src={post.profileImage}
                  alt="profile"
                />
              </LazyLoad>
            ) : (
              <Icon
                name="RxAvatar"
                style={{
                  fontSize: "40px",
                  cursor: "pointer",
                }}
              />
            )}
          </Link>
          <div className="username__info">
            <Link to={`/sp/${post._id}`} className="username cl">
              {post.username}
            </Link>
            <span className="relation">New to Instagram</span>
          </div>
        </div>
        {follow ? (
          <button
            className="follow__button"
            onClick={() => handleFollowAction(post._id, false)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="follow__button"
            onClick={() => handleFollowAction(post._id, true)}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

Profilebar.propTypes = {
  post: PropType.object.isRequired,
};

export default Profilebar;
