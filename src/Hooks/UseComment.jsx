import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function UseComment(INITIAL_COUNT) {
  const [comment, setComment] = useState("");
  const [commentlength, setCommentLength] = useState(INITIAL_COUNT);
  const [Commentarr, setCommentarr] = useState([]);

  const addCommentToPost = async (id, comment) => {
    try {
      const res = await axios.post(
        `${API_URL}/post/addcomment`,
        {
          postid: id,
          text: comment,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Comment added:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      return error;
    }
  };

  return {
    comment,
    setComment,
    commentlength,
    setCommentLength,
    Commentarr,
    setCommentarr,
    addCommentToPost,
  };
}
