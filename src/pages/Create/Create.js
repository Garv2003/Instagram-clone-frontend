import React, { useState } from "react";
import "./Create.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const Create = ({ setProgress }) => {
  const [Title, setTitle] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Description, setDescription] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    uploadpost({ Title, ImageUrl, Description });
    setTitle("");
    setImageUrl("");
    setDescription("");
  };

  const navigate = useNavigate();

  const uploadpost = (post) => {
    setProgress(10);
    axios({
      method: "post",
      url: URL("/post/addpost"),
      data: {
        title: post.Title,
        ImageUrl: post.ImageUrl,
        description: post.Description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      setProgress(50);
      if (res.status === 200) {
        setProgress(70);
        navigate("/profile");
        setProgress(100);
      }
    });
  };

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="posts">
        <div className="container">
          <div className="tic">
            <h1>Create New Post</h1>
          </div>
          <AddPhotoAlternateIcon ClassName="fas" sx={{ fontSize: 150 }} />
          <div>
            <form onSubmit={onSubmit} className="dl-2">
              <div className="field">
                <input
                  id="username"
                  type="text"
                  className="login-input"
                  placeholder="Title"
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label className="login-label" htmlFor="username">
                  Title
                </label>
              </div>
              <div className="field">
                <input
                  id="username"
                  type="text"
                  className="login-input"
                  placeholder="Description"
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label className="login-label" htmlFor="username">
                  Description
                </label>
              </div>
              <div>
                <input
                  className="input12"
                  type="file"
                  name="ImageUrl"
                  onChange={(e) => {
                    setImageUrl(e.target.files[0]);
                  }}
                />
              </div>
              <button className="submitbtn" type="submit">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
