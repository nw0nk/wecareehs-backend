import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On mount, check localStorage for token and user info
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("user") || localStorage.getItem("adminUser");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    const adminToken = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminUser");
    if (adminToken && adminUser) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const login = (token, userData) => {
    // Determine if admin or regular user based on userData role or other property
    if (userData && userData.isAdmin) {
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      setIsAdminAuthenticated(true);
    } else {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
    }
    setUser(userData);
  };

  const adminLogin = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(adminData));
    setIsAdminAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdminAuthenticated, user, login, logout, adminLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
