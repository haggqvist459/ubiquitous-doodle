import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import * as authApi from "@/utils/backend/api/auth";

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    authApi.getSession().then((result) => {
      setUser(result.session?.user ?? null);
      setIsSignedIn(!!result.session);
    });

    const unsubscribe = authApi.onAuthStateChange((signedIn) => {
      if (signedIn) {
        authApi.getSession().then((result) => {
          setUser(result.session?.user ?? null);
          setIsSignedIn(!!result.session);
        });
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;