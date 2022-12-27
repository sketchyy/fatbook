import { createContext, useEffect, useState } from "react";
import firebaseService from "../firebaseService";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("no_user");

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToAuthChanged(setUser);
    return () => unsubscribe();
  }, []);

  if (user === "no_user") {
    // TODO: spinner in the middle
    return <p>Loading...</p>;
  }

  return <AuthContext.Provider value={{ user }} {...props} />;
};
