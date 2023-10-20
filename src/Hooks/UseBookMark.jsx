import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function UseBookMark(INITIAL_VALUE) {
  const [bookmark, setBookmark] = useState(INITIAL_VALUE);
  const bookmarkPostAction = async (id, action) => {
    if (action === true) {
      try {
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
        setBookmark(true);
      } catch (error) {
        console.error("Error bookmarking post:", error);
      }
    } else {
      try {
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
        setBookmark(false);
      } catch (error) {
        console.error("Error bookmarking post:", error);
      }
    }
  };
  return { bookmark, setBookmark, bookmarkPostAction };
}
