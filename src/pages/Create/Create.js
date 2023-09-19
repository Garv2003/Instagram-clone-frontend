import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../layout/Navbar/Navbar";
import logo from "../../assets/load-37.gif";
import "./Create.css";
const shortid = require("shortid");

const Create = ({ setProgress }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", file.type);
      formData.append("file", file);
      formData.append("post_short_id", shortid.generate());

      const response = await axios.post(
        "http://localhost:3456/post/addpost",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        {loading ? (
          <div className="loader">
            <img src={logo} alt="Loading" />
          </div>
        ) : (
          <div className="container">
            <div className="tic">
              <h1>Create New Post</h1>
            </div>
            <AddPhotoAlternateIcon className="fas" sx={{ fontSize: 150 }} />
            <div>
              <form onSubmit={handleSubmit} className="dl-2">
                <div className="field">
                  <input
                    id="Title"
                    type="text"
                    className="login-input"
                    placeholder="Title"
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="login-label" htmlFor="Title">
                    Title
                  </label>
                </div>
                <div className="field">
                  <input
                    id="Description"
                    type="text"
                    className="login-input"
                    placeholder="Description"
                    name="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label className="login-label" htmlFor="Description">
                    Description
                  </label>
                </div>
                <div>
                  <input
                    className="input12"
                    type="file"
                    accept="image/*,video/*"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button className="submitbtn" type="submit">
                  Create Post
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
