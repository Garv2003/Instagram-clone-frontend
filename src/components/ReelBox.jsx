import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../Context/Auth/AuthContext";
import Picker from "emoji-picker-react";
import UseBookMark from "../Hooks/UseBookMark";
import UseLike from "../Hooks/UseLike";
import UseFollow from "../Hooks/UseFollow";
import UseComment from "../Hooks/UseComment";
import { formatInstagramDate } from "../utils/utils";
import PropTypes from "prop-types";
import LazyLoad from "react-lazy-load";
import { Icon } from "../utils/iconutitls";

const Post = ({ post }) => {
  const {
    comment,
    setComment,
    commentlength,
    setCommentLength,
    addCommentToPost,
  } = UseComment(post.comments.length);
  const { Id } = UseAuth();
  const { bookmark, bookmarkPostAction } = UseBookMark(
    post.bookmarks.includes(Id)
  );
  const { like, likes, handleLikeAction } = UseLike(
    post.likes.includes(Id),
    post.likes.length
  );
  const { follow, handleFollowAction } = UseFollow(
    post.User_id.followers.includes(Id)
  );
  const [EmojiBox, setEmojiBox] = useState(false);
  const formattedDate = formatInstagramDate(post.date);

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.length === 0) return;
    addCommentToPost(post._id, comment).then((res) => {
      if (res) {
        post.comments.push(res);
        setCommentLength(commentlength + 1);
        setComment("");
      }
    });
  };

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(false);
  const [box, setBox] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setPlaying(true);
        } else {
          videoRef.current.pause();
          setPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVolume = () => {
    if (volume) {
      setVolume(false);
    } else {
      setVolume(true);
    }
  };

  const handleVideoToggle = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div className="ReelBox">
        <video
          src={post.ImageUrl}
          ref={videoRef}
          muted={volume ? false : true}
          onClick={() => handleVideoToggle()}
        ></video>
        <div className="volume">
          {volume ? (
            <Icon
              name="BsVolumeUpFill"
              className="volume__icon"
              onClick={() => handleVolume()}
            />
          ) : (
            <Icon
              name="BsVolumeMuteFill"
              className="volume__icon"
              onClick={handleVolume}
            />
          )}
        </div>
        <div className="play"></div>
        <div className="ReelBox_Profile">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {post.User_id.profileImage ? (
              <LazyLoad height={40} offset={100}>
                <img
                  className="postprofileimage"
                  src={post.User_id.profileImage}
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
            <Link
              to={
                post.User_id._id === localStorage.getItem("token")
                  ? "/profile"
                  : `/sp/${post.User_id._id}`
              }
              className="cl"
            >
              {post.User_id.username}
            </Link>
            <Link
              className="cl date"
              to={
                post.User_id._id === localStorage.getItem("token")
                  ? "/profile"
                  : `/sp/${post.User_id._id}`
              }
            >
              {" "}
              • {formattedDate} •
            </Link>{" "}
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
          <div className="reel_title">{post.caption}</div>
          <div className="reel_location">{post.location}</div>
        </div>
        {box && (
          <div className="ReelBox_Comments">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Icon
                name="RxCross2"
                className="close__icon"
                onClick={() => setBox(false)}
              />
            </div>
            <div className="formposts">
              <button
                className="emoji__button"
                onClick={() => setEmojiBox(!EmojiBox)}
                style={{ backgroundColor: "black", border: 0 }}
              >
                <Icon
                  name="MdEmojiEmotions"
                  style={{ fontSize: "1.8rem", color: "white" }}
                />
              </button>
              <div className="emoji">
                {EmojiBox && (
                  <Picker
                    onEmojiClick={(event) => {
                      setComment(comment + event.emoji);
                    }}
                    pickerStyle={{
                      width: "100%",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                    }}
                  />
                )}
              </div>
              <input
                id="username"
                type="text"
                className="formposts_input"
                placeholder="Add a comment...."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
                onFocus={() => setEmojiBox(false)}
              />
              <input
                disabled={comment.length == 0}
                className="formposts_button"
                type="submit"
                value="Post"
                onClick={addComment}
              />
            </div>
          </div>
        )}
        <div className="ReelBox_Header">
          <div className="side_icon">
            {like ? (
              <Icon
                name="MdFavorite"
                className="postIcon"
                style={{
                  fontSize: "3rem",
                  color: "red",
                }}
                onClick={() => {
                  handleLikeAction(post._id, false);
                }}
              />
            ) : (
              <Icon
                name="MdOutlineFavoriteBorder"
                className="postIcon"
                style={{ fontSize: "3rem" }}
                onClick={() => {
                  handleLikeAction(post._id, true);
                }}
              />
            )}
            <div
              style={{
                marginLeft: "1.1rem",
              }}
            >
              {likes}
            </div>
          </div>
          <div className="side_icon">
            <Icon
              name="FaRegComment"
              className="postIcon"
              style={{ fontSize: "3rem" }}
              onClick={() => {
                setBox(!box);
              }}
            />
            <div
              style={{
                marginLeft: "1.1rem",
              }}
            >
              {post.comments.length}
            </div>
          </div>
          <Icon
            name="FaTelegramPlane"
            className="postIcon"
            style={{ fontSize: 45 }}
          />
          <div className="side_icon">
            <Link to={`/p/${post._id}`}>
              <Icon
                name="MdOutlineChatBubbleOutline"
                className="postIcon"
                style={{ fontSize: 45 }}
              />
            </Link>
          </div>
          {bookmark ? (
            <Icon
              name="FaBookmark"
              className="postIcon"
              style={{ fontSize: 45 }}
              onClick={() => {
                bookmarkPostAction(post._id, false);
              }}
            />
          ) : (
            <Icon
              name="MdBookmarkBorder"
              className="postIcon"
              style={{ fontSize: 45 }}
              onClick={() => {
                bookmarkPostAction(post._id, true);
              }}
            />
          )}
        </div>
        {!playing && (
          <div className="Reel_play" onClick={() => handleVideoToggle()}>
            <div className="play_button">
              <Icon name="FaPlay" className="play__icon" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
