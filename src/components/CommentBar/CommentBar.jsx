import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./CommentBar.css";
import { formatInstagramDate } from "../../utils/utils";
import { AuthContext } from "../../Context/Auth/AuthContext";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

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

  const handleLikeComment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3456/post/commentlike`,
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
        setLikeCount(likecount + 1);
        setLike(true);
      } else {
        console.error("Failed to like comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnLikeComment = () => {
    axios
      .put(
        `http://localhost:3456/post/commentunlike`,
        {
          commentid: comment._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLikeCount(likecount - 1);
        setLike(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="comment">
        <div>
          {comment.postedby.profileImage ? (
            <img
              className="postprofileimage"
              src={comment.postedby.profileImage}
              alt="profile"
            />
          ) : (
            <Avatar style={{ marginRight: "10px" }}>
              {comment.postedby.username.charAt(0).toUpperCase()}
            </Avatar>
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
                  <DeleteIcon sx={{ fontSize: 15 }} />
                </button>
              ) : null}
              {Id === comment.postedby._id ? (
                <button
                  className="dustbin"
                  onClick={() => {
                    handleEditComment(comment._id, comment.text);
                  }}
                >
                  <EditIcon sx={{ fontSize: 15 }} />
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
            <FavoriteIcon
              style={{ color: "red" }}
              className="postIcon"
              sx={{ fontSize: 30 }}
              onClick={() => handleUnLikeComment()}
            />
          ) : (
            <FavoriteBorderIcon
              className="postIcon"
              sx={{ fontSize: 30 }}
              onClick={() => handleLikeComment()}
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
