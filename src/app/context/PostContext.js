"use client";
import React, { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {

  const [userData, setUserdata] = useState({});
   
  return (
    <PostContext.Provider value={{userData, setUserdata}}>
      {children}
    </PostContext.Provider>
  );
};