import { Link } from "react-router-dom";
import { Icon } from "../utils/iconutitls";
import propTypes from "prop-types";
import LazyLoad from "react-lazy-load";

const Profile = ({ data }) => {
  return (
    <div className="gallery">
      {data.map((post) => {
        return (
          <LazyLoad className="gallery-item" key={post._id}>
            <>
              {post.type === "image" ? (
                <img className="gallery-post" src={post.ImageUrl} />
              ) : (
                <video className="gallery-post" src={post.ImageUrl} />
              )}
              <div />
              <Link to={`/p/${post._id}`}>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes cl">
                      <span className="visually-hidden">Likes:</span>
                      <div className="gallery-item-div">
                        <Icon name="MdFavorite" />
                        {post.likes.length}
                      </div>
                    </li>
                    <li className="gallery-item-comments cl">
                      <span className="visually-hidden">Comments:</span>
                      <div className="gallery-item-div">
                        <Icon name="FaComment" />
                        {post.comments.length}
                      </div>
                    </li>
                  </ul>
                </div>
              </Link>
            </>
          </LazyLoad>
        );
      })}
    </div>
  );
};

Profile.propTypes = {
  data: propTypes.array.isRequired,
};

export default Profile;
