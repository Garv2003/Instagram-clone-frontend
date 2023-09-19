import react, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { Id } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [id, setid] = useState(null);
  console.log(id);
  // useEffect(()=>{
  //     axios.get('http://localhost:5000/api/posts',{
  //         headers:{
  //             Authorization:localStorage.getItem('token')
  //         }
  //     })
  // })

  return (
    <PostContext.Provider value={{ posts, setPosts ,setid ,id}}>
      {children}
    </PostContext.Provider>
  );
};
