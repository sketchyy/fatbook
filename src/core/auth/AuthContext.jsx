import { createContext, useEffect, useState } from "react";
import authService from "../firebase/authService";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("no_user");

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanged(setUser);
    return () => unsubscribe();
  }, []);

  if (user === "no_user") {
    // TODO: spinner in the middle
    return <p>Loading...</p>;
  }

  return <AuthContext.Provider value={{ user }} {...props} />;
};
