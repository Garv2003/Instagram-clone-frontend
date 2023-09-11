import axios from "axios";
import { createContext, useEffect, useState } from "react";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    getsuggestion();
  }, []);
  const getsuggestion = () => {
    axios.get("http://localhost:3456/user/suggestion").then((res) => {
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
