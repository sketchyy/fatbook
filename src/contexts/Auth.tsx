import { OAuthResponse, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import IceCreamSpinner from "@/shared/components/ui/IceCreamSpinner";

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<OAuthResponse>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => supabase.auth.signInWithOAuth({ provider: "google" }),
  signOut: () => supabase.auth.signOut(),
});

export function AuthProvider({ children }) {
  const defaultContextValue = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    ...defaultContextValue,
    user,
  };

  if (loading) {
    return <IceCreamSpinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
