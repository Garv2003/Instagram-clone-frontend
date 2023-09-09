// MyContext.js
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const toggleFollow = (st) => {
    // console.log(st);
    setIsFollowing((prev) => st);
  };

  return (
    <MyContext.Provider value={{ count, incrementCount, isFollowing, toggleFollow }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
