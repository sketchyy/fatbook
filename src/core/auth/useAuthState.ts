import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, user: auth.user, isAuthenticated: auth.user != null };
};
