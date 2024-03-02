import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function UseLike(INITIAL_VALUE, INITIAL_COUNT) {
  const [like, setLike] = useState(INITIAL_VALUE);
  const [likes, setLikes] = useState(INITIAL_COUNT);

  const handleLikeAction = async (id, action) => {
    if (action) {
      try {
        setLike(true);
        setLikes(likes + 1);
        await axios.put(
          `${API_URL}/post/togglelike`,
          {
            postid: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        setLike(false);
        setLikes(likes - 1);
      }
    } else {
      try {
        setLike(false);
        setLikes(likes - 1);
        await axios.put(
          `${API_URL}/post/togglelike`,
          {
            postid: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        setLike(true);
        setLikes(likes + 1);
      }
    }
  };

  return { like, setLike, likes, setLikes, handleLikeAction };
}
