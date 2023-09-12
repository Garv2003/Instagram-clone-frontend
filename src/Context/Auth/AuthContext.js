import { createContext, useEffect, useState } from "react";
import axios from "axios";

const apiEndpoint = (path) => `http://localhost:3456${path}`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const [Id, setId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint("/auth/user"), {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const responseData = response.data;
        setInfo(responseData);
        setId(responseData._id);
      } catch (error) {
        console.log(error);
      }
    };
    if(localStorage.getItem("token") && window.location.pathname !== "/login" && window.location.pathname !== "/signup"){
      fetchData();
    }
  }, []); 

  // useEffect(() => {
  //   // Log the updated info here
  //   console.log(info);
  // }, [info]); // This effect will run whenever 'info' changes.

  console.log("AuthContext info:", info);
  return (
    <AuthContext.Provider value={{ info, setInfo ,Id }}>
      {children}
    </AuthContext.Provider>
  );
}
