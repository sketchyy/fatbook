import { OAuthResponse, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import IceCreamSpinner from "@/components/ui/IceCreamSpinner";

interface AuthContextType {
  user: User | null;
  userId: string;
  signIn: () => Promise<OAuthResponse>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: "guest",
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

  // Will be passed down to Signup, Login and other components
  const value: AuthContextType = {
    ...defaultContextValue,
    user,
    userId: user?.id!,
  };

  if (loading) {
    return <IceCreamSpinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
