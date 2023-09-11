import axios from "axios";
import { createContext, useEffect, useState } from "react";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [Id, setId] = useState([]);

  useEffect(() => {
    setId(localStorage.getItem("token"));
  }, []);

  return (
    <UserContext.Provider value={{ Id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
