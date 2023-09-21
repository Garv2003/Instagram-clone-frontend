import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3456";
export default function UseBookMark(INITIAL_VALUE) {
  const [bookmark, setBookmark] = useState(INITIAL_VALUE);
  const bookmarkPostAction = async (id, action) => {
    if (action == true) {
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
