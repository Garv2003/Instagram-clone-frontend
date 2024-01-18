import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import PropType from "prop-types";
const apiEndpoint = import.meta.env.VITE_APP_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (
          token &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup"
        ) {
          const response = await axios.get(`${apiEndpoint}/auth/user`, {
            headers: {
              Authorization: token,
            },
          });
          const responseData = response.data;
          setInfo(responseData);
          setId(responseData._id);
          setFollowers(responseData.followers);
          setFollowing(responseData.following);
        }
      } catch (error) {
        localStorage.removeItem("token");
        window.location.assign("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [localStorage.getItem("token"), window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        info,
        setInfo,
        Id,
        loading,
        followers,
        setFollowers,
        following,
        setFollowing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};

export function UseAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("null value");
  }
  return context;
}
