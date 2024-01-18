import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./Showpost.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { UseAuth } from "../../Context/Auth/AuthContext";
import { formatInstagramDate } from "../../utils/utils";
import CommentBar from "../../components/CommentBar/CommentBar";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import UseFollow from "../../Hooks/UseFollow";
import UseLike from "../../Hooks/UseLike";
import UseBookMark from "../../Hooks/UseBookMark";
import UseComment from "../../Hooks/UseComment";
import UseShowPost from "../../Hooks/UseShowPost";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa";
import { BsVolumeMuteFill } from "react-icons/bs";
import { BsVolumeUpFill } from "react-icons/bs";
import UsePrev from "../../Hooks/UsePrev";

const Showpost = ({ setProgress }) => {
  const { id } = useParams();
  const { Id } = UseAuth();
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
    type: "",
  });
  ``;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(true);

  const video = useRef(null);

  const VideoPlayer = useMemo(() => {
    if (post.type === "image") return null;
    return (
      <video
        src={post.ImageUrl}
        alt="preview"
        className="preview_image"
        id="video"
        ref={video}
        onClick={playVideo}
      />
    );
  }, [video, post.type, post.ImageUrl]);

  function playVideo() {
    if (video.current.paused) {
      video.current.play();
      document.querySelector(".play").style.display = "none";
    } else {
      video.current.pause();
      document.querySelector(".play").style.display = "flex";
    }
  }

  const {
    comment,
    setComment,
    commentlength,
    setCommentLength,
    Commentarr,
    setCommentarr,
    addCommentToPost,
  } = UseComment();
  const [EmojiBox, setEmojiBox] = useState(false);
  const [EditAndReply, setEditAndReply] = useState(false);
  const { follow, setFollow, handleFollowAction } = UseFollow(false);
  const { like, setLike, likes, setLikes, handleLikeAction } = UseLike(false);
  const { bookmark, setBookmark, bookmarkPostAction } = UseBookMark();
  const { handleUpdate, handleDeletePost } = UseShowPost();
  const { prev } = UsePrev();
  const inputref = useRef(null);

  useEffect(() => {
    getPost();
    if (comment.length === 0) {
      setEditAndReply(false);
    }
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/showpost/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
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
      setLikes(likes.length);
      setBookmark(bookmarks.includes(Id));
      setFollow(followers.includes(Id));
      setCommentarr(comments);
      setComment("");
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setProgress(100);
    }
  };

  const handleReply = (id) => {
    setComment("");
    inputref.current.focus();
    setEditAndReply(true);
    // try {
    //   axios.get(`http://localhost:3456/post/comment/${id}`).then((res) => {
    //     setReptlId(id);
    //     setComment(`@${res.data.username} `);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleDeleteComment = (commentid) => {
    try {
      axios
        .delete(
          `http://localhost:3456/post/deletecomment/?commentid=${commentid}&postid=${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          setCommentarr(
            Commentarr.filter((comment) => comment._id !== commentid)
          );
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

  const hiddenPopup = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (hiddenPopup.current && !hiddenPopup.current.contains(event.target)) {
        setHidden(false);
      }

      if (hiddenPopup.current && hiddenPopup.current.contains(event.target)) {
        setHidden(true);
      }
    };

    if (hidden) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [hidden]);

  const SidePopup = () => {
    return (
      <div className="hidden_popup" ref={hiddenPopup}>
        {post.User_id._id === Id && (
          <button
            className="show_btn"
            style={{
              color: "red",
              border: "none",
            }}
            onClick={() => handleDeletePost(post._id)}
          >
            Delete
          </button>
        )}
        <button className="show_btn" onClick={() => handleUpdate(post._id)}>
          Edit
        </button>
        {/* <div>
            <button className="show_btn">Share</button>
          </div> */}
        {/* <div>
            <button>Hide like count to others</button>
          </div>
          <div>
            <button>Turn off Commenting for this post</button>
          </div> */}
        <Link
          className="cl"
          style={{
            width: "100%",
          }}
          to={post.User_id._id === Id ? "/profile" : `/sp/${post.User_id._id}`}
        >
          <button className="show_btn">About this account</button>
        </Link>
        <button
          className="show_btn"
          onClick={() => {
            setHidden(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  };
  const handlePopup = () => {
    setHidden(!hidden);
  };
  return (
    <div className="show_post">
      <div className="arrow">
        <ArrowBackIcon
          onClick={prev}
          sx={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>
      <div className="Postp_header bar_hidden">
        <div className="postp_header_pro">
          {post.User_id.profileImage ? (
            <img
              className="postprofileimage"
              src={post.User_id.profileImage}
              alt="profile"
            />
          ) : (
            <IoPersonCircleSharp
              style={{
                fontSize: "30px",
                cursor: "pointer",
              }}
            />
          )}
          <Link
            to={
              post.User_id._id === Id ? "/profile" : `/sp/${post.User_id._id}`
            }
            className="cl"
          >
            {post.User_id.username}
          </Link>
          {post.User_id._id !== Id && (
            <div>
              {follow ? (
                <button
                  className="follow__button"
                  onClick={() => handleFollowAction(post.User_id._id, false)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="follow__button"
                  onClick={() => handleFollowAction(post.User_id._id, true)}
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
        <MoreHorizIcon />
      </div>
      <div className="show_post_box">
        <div className="showpost1">
          <div className="im">
            {post.type === "image" ? (
              <img src={post.ImageUrl} alt="Post" />
            ) : (
              <div className="video__container">
                {VideoPlayer}
                <div className="play" onClick={playVideo}>
                  <FaPlay />
                </div>
                <div className="volume">
                  {volume ? (
                    <BsVolumeUpFill
                      onClick={() => {
                        video.current.muted = true;
                        setVolume(false);
                      }}
                    />
                  ) : (
                    <BsVolumeMuteFill
                      onClick={() => {
                        video.current.muted = false;
                        setVolume(true);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="showpost2">
          <div
            className="Postp_header bar_hidden_desk"
            style={{
              padding: "10px",
            }}
          >
            <div className="postp_header_pro">
              {post.User_id.profileImage ? (
                <img
                  className="postprofileimage"
                  src={post.User_id.profileImage}
                  alt="profile"
                />
              ) : (
                <IoPersonCircleSharp
                  style={{
                    fontSize: "40px",
                  }}
                />
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
                  {follow ? (
                    <button
                      className="follow__button"
                      onClick={() =>
                        handleFollowAction(post.User_id._id, false)
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow__button"
                      onClick={() => handleFollowAction(post.User_id._id, true)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <MoreHorizIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                handlePopup();
              }}
            />
            {hidden && <SidePopup />}
            <div
              style={{
                display: "none",
                position: "absolute",
                top: "0",
              }}
            >
              dsldnslndlslkn
            </div>
          </div>
          <div
            className="postp_footer bar_hidden_col"
            style={{
              padding: "10px",
            }}
          >
            <div className="posticons">
              <div className="post_iconsMain">
                {like ? (
                  <FavoriteIcon
                    style={{ color: "red" }}
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => handleLikeAction(post._id, false)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => handleLikeAction(post._id, true)}
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
                    onClick={() => bookmarkPostAction(post._id, false)}
                  />
                ) : (
                  <BookmarkBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => bookmarkPostAction(post._id, true)}
                  />
                )}
              </div>
            </div>
            <div>{likes ? `${likes} likes` : "Be the first to like this"}</div>
            <Link className="cl" to={`/sp/${post.User_id._id}`}>
              {formatInstagramDate(post.date)}
            </Link>
          </div>
          <div className="comment_section">
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
          <div className="postp_footer bar_hidden_desk">
            <div className="posticons">
              <div className="post_iconsMain">
                {like ? (
                  <FavoriteIcon
                    style={{ color: "red" }}
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => handleLikeAction(post._id, false)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => handleLikeAction(post._id, true)}
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
                    onClick={() => bookmarkPostAction(post._id, false)}
                  />
                ) : (
                  <BookmarkBorderIcon
                    className="postIcon"
                    sx={{ fontSize: 45 }}
                    onClick={() => bookmarkPostAction(post._id, true)}
                  />
                )}
              </div>
            </div>
            <div
              style={{
                padding: "0px 10px",
              }}
            >
              {likes ? `${likes} likes` : "Be the first to like this"}
            </div>
            <Link
              style={{
                padding: "0px 10px",
              }}
              className="cl"
              to={`/sp/${post.User_id._id}`}
            >
              {formatInstagramDate(post.date)}
            </Link>
          </div>
          <div
            style={{
              padding: "10px",
            }}
            className="profile_footer1"
          >
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
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Showpost.propTypes = {
  setProgress: PropTypes.func,
};

export default Showpost;
