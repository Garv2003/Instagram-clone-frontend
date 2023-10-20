import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./NoSavedPost.css";

const NoSavedPost = () => {
  return (
    <div className="no-post">
      <div className="post-body">
      <BookmarkBorderIcon sx={{fontSize:"80px"}}/>
        <h1 className="nopost-heading">Share Photos</h1>
        <div className="nosavedpost-footer">
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </div>
      </div>
    </div>
  );
};

export default NoSavedPost;
