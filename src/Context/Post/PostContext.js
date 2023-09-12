import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
const PostContext = createContext(null);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (
      (window.location.pathname !== "/login" ||
        window.location.pathname !== "/signup") &&
      localStorage.getItem("token")
    ) {
      getdata();
    }
  }, []);
  const getdata = async () => {
    const res = await axios.get(
      "http://localhost:3456/post",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setPosts(res.data);
  };
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider };
export default PostContext;
