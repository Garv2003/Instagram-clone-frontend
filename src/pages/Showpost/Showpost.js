import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./Showpost.css";
import { AuthContext } from "../../Context/Auth/AuthContext";
import {
  deletePost,
  unbookmark,
  bookmarkPost,
  follow,
  unfollow,
  likePost,
  unlikePost,
  addCommentToPost,
  formatInstagramDate,
} from "../../utils/utils";
import CommentBar from "../../components/CommentBar/CommentBar";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EditIcon from "@mui/icons-material/Edit";

const API_URL = "http://localhost:3456";

const Showpost = ({ setProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Id } = useContext(AuthContext);
  const scrollRef = useRef();

  const [post, setPost] = useState({
    User_id: {
      _id: "",
      username: "",
      profileImage: "",
      followers: [],
    },
    ImageUrl: "",
    comments: [],
    likes: [],
    bookmarks: [],
    date: "",
  });

  const [comment, setComment] = useState("");
  const [commentlength, setCommentLength] = useState(0);
  const [like, setLike] = useState(false);
  const [likecount, setLikeCount] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [Commentarr, setCommentarr] = useState([]);
  const [EmojiBox, setEmojiBox] = useState(false);
  const [EditAndReply, setEditAndReply] = useState(false);
  const inputref = useRef(null);

  useEffect(() => {
    getPost();
    if (comment.length === 0) {
      setEditAndReply(false);
    }
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/showpost/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setProgress(0);
      const postData = response.data;
      setPost(postData);

      const {
        User_id: { _id, username, profileImage, followers },
        ImageUrl,
        comments,
        likes,
        bookmarks,
        date,
      } = postData;

      setCommentLength(comments.length);
      setLike(likes.includes(Id));
      setLikeCount(likes.length);
      setBookmark(bookmarks.includes(Id));
      setFollowed(followers.includes(Id));
      setCommentarr(comments);
      setComment("");
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setProgress(100);
    }
  };

  const toggleFollow = (userid) => {
    const followAction = followed ? unfollow : follow;
    followAction(userid).then((res) => {
      setFollowed(res);
    });
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (comment.length === 0 && comment.trim().length === 0) {
      return;
    }
    const res = await addCommentToPost(post._id, comment);
    if (res.message === "true") {
      setCommentarr([...Commentarr, res.comment]);
      setCommentLength(commentlength + 1);
      setComment("");
    }
  };

  const toggleLikeHandler = () => {
    const likeAction = like ? unlikePost : likePost;
    likeAction(post._id).then((res) => {
      setLike(res);
      setLikeCount((prevCount) => (res ? prevCount + 1 : prevCount - 1));
    });
  };

  const toggleBookmarkHandler = () => {
    const bookmarkAction = bookmark ? unbookmark : bookmarkPost;
    bookmarkAction(post._id).then((res) => {
      setBookmark(res);
    });
  };

  const handleDelete = () => {
    deletePost(post._id).then((res) => {
      if (res) {
        navigate("/profile");
      }
    });
  };

  const handleUpdate = () => {
    axios
      .post(`http://localhost:3456/post/updatepost/${post._id}`, {
        ImageUrl: post.ImageUrl,
        title: post.title,
        description: post.description,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleReply = (id) => {
    setComment("");
    inputref.current.focus();
    setEditAndReply(true);
    console.log(id);
    // try {
    //   axios.get(`http://localhost:3456/post/comment/${id}`).then((res) => {
    //     setReptlId(id);
    //     setComment(`@${res.data.username} `);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleDeleteComment = (id) => {
    try {
      axios
        .delete(`http://localhost:3456/post/deletecomment/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCommentarr(Commentarr.filter((comment) => comment._id !== id));
          setCommentLength(commentlength - 1);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditComment = (id, text) => {
    setEditAndReply(true);
    setComment(text);
    inputref.current.focus();

    // try {
    //   axios
    //     .patch(
    //       `http://localhost:3456/post/editcomment/${id}`,
    //       {
    //         comment: comment,
    //       },
    //       {
    //         headers: {
    //           Authorization: localStorage.getItem("token"),
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       setCommentarr(Commentarr.filter((comment) => comment._id !== id));
    //       setCommentLength(commentlength - 1);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Commentarr]);

  return (
    <div className="showpost">
      <div className="arrow">
        <ArrowBackIcon onClick={handleBack} sx={{ fontSize: "50px" }} />
      </div>
      <div className="showpostbox">
        <div className="showpost1">
          <img className="im" src={post.ImageUrl} alt="Post" />
          <div className="showbuttons">
            {post.User_id._id === Id && (
              <button className="showbtn" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button className="showbtn" onClick={handleUpdate}>
              Edit
            </button>
            <Link className="cl" to={`/sp/${post.User_id._id}`}>
              <button className="showbtn">About this account</button>
            </Link>
          </div>
        </div>
        <div className="showpost2">
          <div className="Postp_header">
            <div className="postp_header_pro">
              {post.User_id.profileImage ? (
                <img
                  className="postprofileimage"
                  src={post.User_id.profileImage}
                  alt="profile"
                />
              ) : (
                <Avatar style={{ marginRight: "10px" }}>
                  {post.User_id.username.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Link
                to={
                  post.User_id._id === Id
                    ? "/profile"
                    : `/sp/${post.User_id._id}`
                }
                className="cl"
              >
                {post.User_id.username}
              </Link>
              {post.User_id._id !== Id && (
                <div>
                  {followed ? (
                    <button
                      className="follow__button"
                      onClick={() => toggleFollow(post.User_id._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow__button"
                      onClick={() => toggleFollow(post.User_id._id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <MoreHorizIcon />
          </div>
          <div className="commentsection">
            {Commentarr.length === 0 ? (
              <div className="comment_heading">
                <h2>No comments Yet.</h2>
                <div>Start the conversation.</div>
              </div>
            ) : (
              Commentarr.map((comment, index) => (
                <CommentBar
                  comment={comment}
                  key={index}
                  handleReply={handleReply}
                  handleDeleteComment={handleDeleteComment}
                  handleEditComment={handleEditComment}
                />
              ))
            )}
            <div ref={scrollRef}></div>
          </div>
          <div className="postp_footer">
            <div className="posticons">
              <div className="post_iconsMain">
                {like ? (
                  <FavoriteIcon
                    style={{ color: "red" }}
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={toggleLikeHandler}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={toggleLikeHandler}
                  />
                )}
                <ChatBubbleOutlineIcon
                  sx={{ fontSize: 45 }}
                  className="postIcon cl"
                />
                <TelegramIcon sx={{ fontSize: 45 }} className="postIcon" />
              </div>
              <div className="post_iconsb">
                {bookmark ? (
                  <BookmarkIcon
                    style={{ color: "white" }}
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={toggleBookmarkHandler}
                  />
                ) : (
                  <BookmarkBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={toggleBookmarkHandler}
                  />
                )}
              </div>
            </div>
            <div>
              {likecount ? `${likecount} likes` : "Be the first to like this"}
            </div>
            <Link className="cl" to={`/sp/${post.User_id._id}`}>
              {formatInstagramDate(post.date)}
            </Link>
          </div>
          <div className="profile_footer1">
            View all {commentlength} comments
            <div className="formposts">
              <button
                className="emoji__button"
                onClick={() => setEmojiBox(!EmojiBox)}
                style={{ backgroundColor: "black", border: 0 }}
              >
                <EmojiEmotionsIcon sx={{ color: "white" }} />
              </button>
              <div className="emoji">
                {EmojiBox && (
                  <Picker
                    onEmojiClick={(event) => {
                      setComment(comment + event.emoji);
                    }}
                    pickerStyle={{ width: "100%" }}
                  />
                )}
              </div>
              <input
                id="username"
                type="text"
                className="formposts_input"
                placeholder={
                  EditAndReply ? "Add Reply...." : "Add a comment...."
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={() => setEmojiBox(false)}
                onBlur={() => {
                  setEmojiBox(false);
                }}
                ref={inputref}
              />
              <input
                className="formposts_button"
                onClick={addCommentHandler}
                value="Post"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showpost;
