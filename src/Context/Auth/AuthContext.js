import { createContext, useEffect, useState } from "react";
import axios from "axios";

const apiEndpoint = "http://localhost:3456";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          const response = await axios.get(`${apiEndpoint}/auth/user`, {
            headers: {
              Authorization: token,
            },
          });
          const responseData = response.data;
          setInfo(responseData);
          setId(responseData._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider value={{ info, setInfo, Id, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
