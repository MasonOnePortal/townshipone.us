"use client";
import { useContext, useState, createContext } from "react";
export const initialValue = {
  updateName: () => {},
  name: "",
};
export const BlogContext = createContext(initialValue);
export const BlogProvider = ({ children }) => {
  const [name, setName] = useState("");
  const updateName = (val) => {
    setName(val);
  };
  return (
    <BlogContext.Provider value={{ name, updateName }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContent = () => useContext(BlogContext);
