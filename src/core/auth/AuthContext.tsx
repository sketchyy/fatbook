import IceCreamSpinner from "@/shared/components/ui/IceCreamSpinner";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import authService from "../firebase/authService";

const guestUser: User = {
  uid: "no_user",
} as unknown as User;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: guestUser,
  isAuthenticated: false,
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState<User>(guestUser);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanged(setUser);
    return () => unsubscribe();
  }, []);

  if (user && user.uid === "no_user") {
    return <IceCreamSpinner />;
  }

  return <AuthContext.Provider value={{ user }} {...props} />;
};
