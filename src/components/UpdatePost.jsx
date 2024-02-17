import { useRef, useState, useMemo } from "react";
import { ColorRing } from "react-loader-spinner";
import PropType from "prop-types";
import { UseAuth } from "../Context/Auth/AuthContext";
import axios from "axios";
import { GrFormPreviousLink } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import { MdError, MdOutlineLocationOn } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import Picker from "emoji-picker-react";
import { RxCross2 } from "react-icons/rx";
import Right from "../assets/Right_Logo.png";
import { FaPlay } from "react-icons/fa";
import { BsVolumeMuteFill } from "react-icons/bs";
import { BsVolumeUpFill } from "react-icons/bs";

const UpdatePost = () => {
  document.title = "Create new Post • Instagram";
  const { info } = UseAuth();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [next, setNext] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [location, setLocation] = useState("");
  const [volume, setVolume] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("location", location);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/addpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Post Created Successfully");
        setCaption("");
        setFile(null);
        setNext(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const video = useRef(null);

  const VideoPlayer = useMemo(() => {
    return (
      <video
        // src={}
        alt="preview"
        className="preview_image"
        id="video"
        ref={video}
        onClick={playVideo}
      />
    );
  }, []);

  function playVideo() {
    if (video.current.paused) {
      video.current.play();
      document.querySelector(".play").style.display = "none";
    } else {
      video.current.pause();
      document.querySelector(".play").style.display = "flex";
    }
  }

  const Popup = () => {
    return (
      <>
        <div className={`ProfilePopup ${showPopup ? "show" : ""}`}>
          <div className="popupprofile">
            <div className="popupprofile_item1">
              <div>Discard post?</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginTop: "10px",
                  opacity: "0.7",
                }}
              >
                If you leave, your edits won&apos;t be saved.
              </div>
            </div>
          </div>
          <div
            className="popupprofile_item rel popupprofile"
            onClick={() => {
              setShowPopup(false);
              setFile(null);
              setNext(false);
            }}
          >
            Discard
          </div>
          <button
            className="popupprofile_item"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
        </div>
        <div
          className={`overlay ${showPopup ? "open" : ""}`}
          onClick={() => setShowPopup(!showPopup)}
        ></div>
      </>
    );
  };

  return (
    <div className="Create_container">
      <div className="container">
        <div className="tic">
          {next && (
            <RxCross2
              onClick={() => {
                setShowPopup(true);
              }}
              className="icon cross"
            />
          )}
          {next ? (
            <GrFormPreviousLink
              onClick={() => {
                setShowPopup(true);
              }}
              className="icon hidbtn"
            />
          ) : (
            <div></div>
          )}
          {showPopup ? <Popup /> : ""}
          <h1>Create New Post</h1>
          {next ? (
            <button
              className="submit_btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              Create Post
            </button>
          ) : (
            <div></div>
          )}
        </div>
        {error && (
          <div className="error">
            <MdError size="2.5rem" color="#fafafa" />
            <div>{error}</div>
          </div>
        )}
        {success && (
          <div className="success">
            <img
              src={Right}
              alt="Success"
              style={{ width: "100px", height: "100px" }}
            />
            <div>{success}</div>
          </div>
        )}
        {loading ? (
          <div className="loader" style={{ textAlign: "center" }}>
            <ColorRing
              visible={true}
              height="150"
              width="150"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
            <div
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginTop: "10px",
                opacity: "0.7",
              }}
            >
              Creating Post
            </div>
          </div>
        ) : next ? (
          <div className="preview">
            <div className="preview_left">
              {type === "image" ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="preview_image"
                />
              ) : (
                <>
                  {VideoPlayer}
                  <div className="play" onClick={playVideo}>
                    <FaPlay />
                  </div>
                  <div className="volume">
                    {volume ? (
                      <BsVolumeUpFill
                        onClick={() => {
                          setVolume(!volume);
                          video.current.muted = true;
                        }}
                      />
                    ) : (
                      <BsVolumeMuteFill
                        onClick={() => {
                          setVolume(!volume);
                          video.current.muted = false;
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="preview_right">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>
                  {info.profileImage ? (
                    <img
                      className="postprofileimage"
                      src={info.profileImage}
                      alt="profile"
                    />
                  ) : (
                    <RxAvatar
                      style={{
                        fontSize: "40px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
                <div>{info.username}</div>
              </div>
              <div className="preview_input">
                <div>
                  <textarea
                    type="text"
                    placeholder="Write a caption..."
                    className="preview_caption"
                    value={caption}
                    onChange={(e) => {
                      if (e.target.value.length <= 2200) {
                        setCaption(e.target.value);
                      }
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      padding: "5px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        zIndex: "100",
                      }}
                    >
                      {emoji && (
                        <Picker
                          onEmojiClick={(event) => {
                            setCaption(caption + event.emoji);
                          }}
                          pickerStyle={{ width: "100%" }}
                        />
                      )}
                    </div>
                    <div
                      className={`overlaypo ${emoji ? "open" : "hidden"}`}
                      onClick={() => setEmoji(!emoji)}
                    ></div>
                    <div>
                      <MdEmojiEmotions
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          color: "#8e8e8e",
                        }}
                        onClick={() => setEmoji(!emoji)}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        opacity: "0.7",
                      }}
                    >
                      <span>{caption.length}</span> /2,200
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                    padding: "5px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add Location"
                    className="preview_location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <MdOutlineLocationOn
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "#8e8e8e",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (error.length === 0) & (success.length === 0) ? (
          <div className="dropzone" {...getRootProps()}>
            {" "}
            <svg
              aria-label="Icon to represent media such as images or videos"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="77"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="96"
            >
              <title>Icon to represent media such as images or videos</title>
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
            <div>Drag photos or videos here</div>
            <div>
              <input
                className="input12"
                type="file"
                accept="image/*,video/*"
                name="file"
                {...getInputProps()}
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
              <button className="submit_btn">select from device</button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

UpdatePost.propTypes = {
  setProgress: PropType.func,
};

export default UpdatePost;
