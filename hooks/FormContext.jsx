"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for authentication status
    const storedStatus = localStorage.getItem("isLoggedIn");
    if (storedStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login and update local storage
  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Function to handle logout and update local storage
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <FormContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </FormContext.Provider>
  );
}

export function useAuth() {
  return useContext(FormContext);
}
