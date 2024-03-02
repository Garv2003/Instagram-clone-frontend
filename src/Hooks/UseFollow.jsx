import { useState } from "react";
import axios from "axios";
import { UseAuth } from "../Context/Auth/AuthContext";

export default function UseFollow(INITIALVALUE) {
  const [follow, setFollow] = useState(INITIALVALUE);
  const { followers, setFollowers } = UseAuth();
  const handleFollowAction = async (id, action) => {
    if (action === true) {
      try {
        setFollow(true);
        await axios.put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/togglefollow`,
          {
            followId: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFollowers([...followers, id]);
      } catch (error) {
        setFollow(false);
      }
    } else if (action === false) {
      try {
        setFollow(false);
        await axios.put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/togglefollow`,
          {
            followId: id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const newFollowers = followers.filter((item) => item !== id);
        setFollowers(newFollowers);
      } catch (error) {
        setFollow(true);
      }
    }
  };

  return { follow, setFollow, handleFollowAction };
}
