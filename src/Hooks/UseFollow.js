import react from "react";
import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function UseFollow(INITIALVALUE) {
  const [follow, setFollow] = useState(INITIALVALUE);
  
  const handleFollowAction = async (id, action) => {
    try {
      if (action === true) {
        await axios.put(
          `${API_URL}/user/follow`,
          {
            followId: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFollow(true);
      } else if (action === false) {
        await axios.put(
          `${API_URL}/user/unfollow`,
          {
            followId: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFollow(false);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return { follow, setFollow, handleFollowAction };
}
