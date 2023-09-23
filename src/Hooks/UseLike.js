import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function UseLike(INITIAL_VALUE, INITIAL_COUNT) {
  const [like, setLike] = useState(INITIAL_VALUE);
  const [likes, setLikes] = useState(INITIAL_COUNT);

  const handleLikeAction = async (id, action) => {
    try {
      if (action) {
        await axios.put(
          `${API_URL}/post/like`,
          {
            postid: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLike(true);
        setLikes(likes + 1);
      } else {
        await axios.put(
          `${API_URL}/post/unlike`,
          {
            postid: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLike(false);
        setLikes(likes - 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return { like, setLike, likes, setLikes, handleLikeAction };
}
