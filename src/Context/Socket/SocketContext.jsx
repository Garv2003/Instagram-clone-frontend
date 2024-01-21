import { createContext, useEffect, useContext, useRef } from "react";
import PropType from "prop-types";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef();

  useEffect(() => {
    if (
      window.location.pathname !== "/login" ||
      window.location.pathname !== "/signup"
    ) {
      socket.current = io(socketUrl, {
        transports: ["websocket"],
        query: {
          token: localStorage.getItem("token"),
        },
      });
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropType.node.isRequired,
};

export function UseSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("null value");
  }
  return context;
}
