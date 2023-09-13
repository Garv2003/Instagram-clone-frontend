import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../../utils/utils";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { AccountCircle } from "@mui/icons-material";

const Profilebar = ({ post }) => {
  const { Info, Id } = useContext(AuthContext);
  const [followed, setFollowed] = useState(post.followers.includes(Id));

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      if (res) {
        post.followers.push(Id);
      } else {
        const index = post.followers.indexOf(Id);
        if (index > -1) {
          post.followers.splice(index, 1);
        }
      }
      setFollowed(res);
    });
  };
  return (
    <div key={post._id}>
      {post._id !== Id ? (
        <div className="suggestions__username">
          <div className="username__left">
            <Link to={`/showprofile/${post._id}`} className="avatar cl">
              {post.profileImage ? (
                <img
                  className="postprofileimage"
                  src={post.profileImage}
                  alt="profile"
                />
              ) : (
                <AccountCircle sx={{fontSize:35}}/>
              )}
            </Link>
            <div className="username__info">
              <Link to={`/showprofile/${post._id}`} className="username cl">
                {post.username}
              </Link>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          {followed ? (
            <button
              className="follow__button"
              onClick={() => toggleFollow(post._id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="follow__button"
              onClick={() => toggleFollow(post._id)}
            >
              Follow
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profilebar;
