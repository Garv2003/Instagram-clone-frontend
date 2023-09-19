import { createContext, useEffect, useState } from "react";
import axios from "axios";

const apiEndpoint = "http://localhost:3456";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  

  useEffect(() => {
    
  }, []);  

  return (
    <UserContext.Provider value={{ info, setInfo, Id, loading }}>
      {children}
    </UserContext.Provider>
  );
};
