import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

//context provider for having user info in multiple components

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); // to turn localstorage date from string to object

  const login = async (inputs) => {
    const res = await axios.post("/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider> //this allows us to use these functions and state everywhere just have to wrap app in it
  );
};
