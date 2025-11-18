import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../roro_api/roroAxiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load (e.g., from sessionStorage)
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      try {
        const { token } = JSON.parse(storedAuth);
        if (token) {
          setIsAuthenticated(true);
          setUser({ username: JSON.parse(storedAuth).username });
        }
      } catch (e) {
        console.error("Error parsing auth from sessionStorage:", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
        username: responseUsername,
      } = response.data;
      if (accessToken) {
        // Store in sessionStorage to match axiosInstance
        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            token: accessToken,
            refreshToken,
            tokenType,
            expiresIn,
            username: responseUsername,
          })
        );
        setIsAuthenticated(true);
        setUser({ username: responseUsername || username });
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
