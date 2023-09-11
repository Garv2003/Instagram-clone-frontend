import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

const ExploreContext = createContext(null);

const ExploreProvider = ({ children }) => {
  const [exoposts, setExoposts] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await axios.get(
      `http://localhost:3456/post/explore/${localStorage.getItem("token")}`,
      {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setExoposts(res.data);
  };

  return (
    <ExploreContext.Provider value={{ exoposts, setExoposts }}>
      {children}
    </ExploreContext.Provider>
  );
};

export { ExploreProvider };
export default ExploreContext;
