import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../layout/Navbar/Navbar";
import logo from "../../assets/load-37.gif";
import "./Create.css";

const Create = ({ setProgress }) => {
  const [formData, setFormData] = useState({
    Title: "",
    ImageUrl: "",
    Description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "ImageUrl" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setProgress(10);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3456/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        // setProgress(70);
        setLoading(false);
        navigate("/profile");
        // setProgress(100);
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
                    value={formData.Title}
                    onChange={handleChange}
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
                    value={formData.Description}
                    onChange={handleChange}
                  />
                  <label className="login-label" htmlFor="Description">
                    Description
                  </label>
                </div>
                <div>
                  <input
                    className="input12"
                    type="file"
                    name="ImageUrl"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="submitbtn"
                  type="submit"
                >
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
