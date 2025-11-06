import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../roro_api/roroAxiosInstance";

const AuthContext = createContext();

// Helper functions for cookies
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on app load (e.g., from cookies)
  useEffect(() => {
    const token = getCookie("authToken");
    const userCookie = getCookie("authUser");
    if (token) {
      setIsAuthenticated(true);
      setUser(userCookie ? JSON.parse(userCookie) : null);
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
        setCookie("authToken", token);
        setCookie("authUser", JSON.stringify(responseUser || { username }));
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
    deleteCookie("authToken");
    deleteCookie("authUser");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
