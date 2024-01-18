import { createContext, useEffect, useContext, useRef } from "react";
import PropType from "prop-types";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(socketUrl, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
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
