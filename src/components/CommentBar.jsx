import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { formatInstagramDate } from "../utils/utils";
import { AuthContext } from "../Context/Auth/AuthContext";
import axios from "axios";
import { Icon } from "../utils/iconutitls";
import PropTypes from "prop-types";
import LazyLoad from "react-lazy-load";

const CommentBar = ({
  comment,
  handleReply,
  handleDeleteComment,
  handleEditComment,
}) => {
  const { Id } = useContext(AuthContext);
  const [like, setLike] = useState(comment.likes.includes(Id));
  const [likecount, setLikeCount] = useState(comment.likes.length);
  const [ReplyArr, setReplyArr] = useState(comment.replies);
  const [ReplyLength, setReplyLength] = useState(comment.replies.length);

  const handletoggleLikeComment = async (action) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/commenttogglelike`,
        {
          commentid: comment._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        if (action === "like") {
          setLikeCount(likecount + 1);
          setLike(true);
        }
        if (action === "unlike") {
          setLikeCount(likecount - 1);
          setLike(false);
        }
      } else {
        console.error("Failed to like comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="comment">
        <div>
          {comment.postedby.profileImage ? (
            <LazyLoad>
              <img
                className="postprofileimage"
                src={comment.postedby.profileImage}
                alt="profile"
              />
            </LazyLoad>
          ) : (
            <Icon
              name="RxAvatar"
              className="icon"
              style={{ marginRight: "10px" }}
            />
          )}
        </div>
        <div className="comment_header">
          <div className="comment_header1">
            <div className="comment_header11">
              <Link className="cl" to={`/sp/${comment.postedby._id}`}>
                {comment.postedby.username}
              </Link>
              {comment.text}
            </div>
            <div className="comment_header2 comment_header11">
              <div>{formatInstagramDate(comment.createdAt)}</div>
              <div>{likecount} likes</div>
              <button
                className="replybtn"
                onClick={() => handleReply(comment._id)}
              >
                Reply
              </button>
              {Id === comment.postedby._id ? (
                <button
                  className="dustbin"
                  onClick={() => {
                    handleDeleteComment(comment._id);
                  }}
                >
                  <Icon name="MdDelete" style={{ fontSize: "1rem" }} />
                </button>
              ) : null}
              {Id === comment.postedby._id ? (
                <button
                  className="dustbin"
                  onClick={() => {
                    handleEditComment(comment._id, comment.text);
                  }}
                >
                  <Icon name="MdEdit" style={{ fontSize: "1rem" }} />
                </button>
              ) : null}
            </div>
            {ReplyLength > 0 ? (
              <div className="comment_reply">
                -- View all {ReplyLength} replies
              </div>
            ) : null}
          </div>
          {like ? (
            <Icon
              name="MdFavorite"
              style={{ color: "red", fontSize: "2.5rem" }}
              className="postIcon"
              onClick={() => handletoggleLikeComment("unlike")}
            />
          ) : (
            <Icon
              name="MdOutlineFavoriteBorder"
              className="postIcon"
              style={{ fontSize: "2.5rem" }}
              onClick={() => handletoggleLikeComment("like")}
            />
          )}
        </div>
      </div>
    </>
  );
};

CommentBar.propTypes = {
  comment: PropTypes.object.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default CommentBar;
