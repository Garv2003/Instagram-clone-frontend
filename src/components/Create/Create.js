import React, { useState } from "react";
import "./Create.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Create = ({ upload }) => {
  const [Title, setTitle] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    upload({ Title, ImageUrl, Description });
    setTitle("");
    setImageUrl("");
    setDescription("");
  };

  return (
    <div class="container">
      <div class="container1">
        <div class="tic">
          <h1>Create New Post</h1>
        </div>
        <div className="addphotoicon">
          <AddPhotoAlternateIcon
            baseClassName="fas"
            className="fa-plus-circle"
            sx={{ fontSize: 150 }}
          />
        </div>
        <div>
          <form onSubmit={onSubmit} className="dl-2">
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Phone number, username, or email"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <label className="login-label" for="username">
                Title
              </label>
            </div>
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Phone number, username, or email"
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label className="login-label" for="username">
                Description
              </label>
            </div>
            <div>
              <label className="lab">Upload image</label>
              <input
                className="input12"
                type="file"
                name="ImageUrl"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
              />
            </div>
            <button className="submitbtn" type="submit">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
