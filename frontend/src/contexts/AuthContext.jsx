import React, { createContext, useState, useEffect } from "react";
import { getUserMe } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // 앱 실행 시 토큰이 유효한지 백엔드에 확인
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthChecking(false);
      return;
    }
    try {
      const res = await getUserMe();
      setUser(res.data); // 내 정보 세팅
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setIsAuthChecking(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loginSuccess = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthChecking, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
