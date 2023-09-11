import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

const PostContext = createContext(null);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const res = await axios.get(
      `http://localhost:3456/post/${localStorage.getItem("token")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
