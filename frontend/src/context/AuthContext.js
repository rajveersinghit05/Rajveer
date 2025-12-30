import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedRole = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (username, password) => {
    const res = await api.post("auth/login/", {
      username,
      password,
    });

    localStorage.setItem("access_token", res.data.access);
    setIsAuthenticated(true);

    // Fetch profile to get role
    const profileRes = await api.get("profile/me/");
    localStorage.setItem("role", profileRes.data.role);
    setRole(profileRes.data.role);
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
