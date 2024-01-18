import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function UseBookMark(INITIAL_VALUE) {
  const [bookmark, setBookmark] = useState(INITIAL_VALUE);
  const bookmarkPostAction = async (id, action) => {
    if (action === true) {
      try {
        setBookmark(true);
        await axios.put(
          `${API_URL}/post/bookmark`,
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
        setBookmark(false);
      }
    } else {
      try {
        setBookmark(false);
        await axios.put(
          `${API_URL}/post/unbookmark`,
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
        setBookmark(true);
      }
    }
  };
  return { bookmark, setBookmark, bookmarkPostAction };
}
