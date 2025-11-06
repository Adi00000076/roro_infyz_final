import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../__api__/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on app load (e.g., from sessionStorage)
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      try {
        const { token, user: storedUser } = JSON.parse(storedAuth);
        if (token) {
          setIsAuthenticated(true);
          setUser(storedUser || null);
        }
      } catch (e) {
        console.error("Error parsing auth from sessionStorage:", e);
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { token, user: responseUser } = response.data;
      if (token) {
        sessionStorage.setItem(
          "auth",
          JSON.stringify({ token, user: responseUser })
        );
        setIsAuthenticated(true);
        setUser(responseUser || { username });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem("auth");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
