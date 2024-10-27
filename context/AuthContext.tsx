import React, { createContext, useState, useContext, ReactNode } from "react";
import { hashPassword } from "@/utils/helpers/passwordHelper";

interface AuthContextType {
  isLoggedIn: boolean;
  isUserAdmin: boolean;
  email: string;
  hasLoginError: boolean;
  hasRegisterError: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isUserAdmin: false,
  hasLoginError: false,
  hasRegisterError: false,
  email: "",
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);
  const [hasRegisterError, setHasRegisterError] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const login = (email: string, password: string) => {
    if (hasLoginError) {
      setHasLoginError(false);
    }
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) === false ||
      password === ""
    ) {
      setHasLoginError(true);
      return;
    }
    const passwordHash = hashPassword(password);
    const storedData = JSON.parse(localStorage.getItem("users") || "{}");
    if (!storedData[email] || storedData[email].password !== passwordHash) {
      setHasLoginError(true);
      return;
    }
    if (storedData[email].userType === "admin") {
      setIsUserAdmin(true);
    }
    setEmail(email);
    setIsLoggedIn(true);
  };
  const register = (email: string, password: string) => {
    if (hasRegisterError) {
      setHasRegisterError(false);
    }

    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) === false ||
      password === ""
    ) {
      setHasRegisterError(true);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("users") || "{}");
    if (storedData[email]) {
      setHasRegisterError(true);
      return;
    }

    let userType = "user";
    if (Object.keys(storedData).length === 0) {
      userType = "admin";
      setIsUserAdmin(true);
    }

    const passwordHash = hashPassword(password);
    storedData[email] = {
      ...storedData[email],
      password: passwordHash,
      userType,
    };
    localStorage.setItem("users", JSON.stringify(storedData));

    setEmail(email);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setIsUserAdmin(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isUserAdmin,
        email,
        hasLoginError,
        hasRegisterError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
