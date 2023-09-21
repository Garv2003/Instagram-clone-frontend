import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3456";

export default function UseComment(INITIAL_COUNT) {
  const [comment, setComment] = useState("");
  const [commentlength, setCommentLength] = useState(INITIAL_COUNT);
  const [Commentarr, setCommentarr] = useState([]);

  const addCommentToPost = async (id, comment) => {
    return new Promise(async (resolve, reject) => {
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
        resolve(res.data);
      } catch (error) {
        console.error("Error adding comment:", error);
        reject(error);
      }
    });
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
