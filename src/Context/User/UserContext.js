import { createContext, useEffect, useState } from "react";
import axios from "axios";
const UserContext = createContext(null);

const URL = (mypath) => {
  return `http://localhost:3456${mypath}`;
};

const UserProvider = ({ children }) => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      getsuggestion();
    }
  }, []);
  const getsuggestion = () => {
    axios
      .get(URL("/user/suggestion"), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  };
  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
