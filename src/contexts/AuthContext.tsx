import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import * as authApi from "@/utils/backend/api/auth";

type UserRoleType = 'admin' | 'user'
type AuthContextType = {
  user: User | null
  isSignedIn: boolean
  userRole: UserRoleType | null
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)

  useEffect(() => {
    authApi.getSession().then(async (session) => {
      const currentUser = session?.user ?? null
      setUser(session?.user ?? null);
      setIsSignedIn(!!session);

      if (currentUser) {
        const fetchedUserRole = await authApi.getUserRoleAPI(currentUser.id);
        setUserRole(fetchedUserRole);
      }

    });

    const unsubscribe = authApi.onAuthStateChange((signedIn) => {
      if (signedIn) {
        authApi.getSession().then(async (session) => {
          const currentUser = session?.user ?? null
          setUser(session?.user ?? null);
          setIsSignedIn(!!session);
          if (currentUser) {
            const fetchedUserRole = await authApi.getUserRoleAPI(currentUser.id);
            setUserRole(fetchedUserRole);
          }

        });
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user, isSignedIn, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

export const useAuthenticatedUser = (): User => {
  const { user } = useAuth();
  return user as User;
};