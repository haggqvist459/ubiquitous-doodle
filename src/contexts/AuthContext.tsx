import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import * as authApi from "@/utils/backend/api/auth";
import { getAllFavouritesAPI } from "@/utils/backend/api/favourites";
import { useAppDispatch } from "@/redux/hooks";
import { setFavourites, resetState } from "@/features/favourites";

type UserRoleType = 'admin' | 'user'
type AuthContextType = {
  user: User | null
  isSignedIn: boolean
  userRole: UserRoleType | null
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isSignedIn: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const dispatch = useAppDispatch()
  const userIdRef = useRef<string | null>(null);

  const loadUserState = async () => {
    console.log("loadUserState triggered")
    try {
      const session = await authApi.getSession()
      const currentUser = session?.user ?? null

      setUser(currentUser)
      setIsSignedIn(!!session)
      userIdRef.current = currentUser?.id ?? null; // Update ref

      if (currentUser) {
        console.log("about to make two DB calls")
        const fetchedUserRole = await authApi.getUserRoleAPI(currentUser.id)
        setUserRole(fetchedUserRole)
      }

    } catch (error) {
      console.error("AuthContext, loadUserState error:", error)
    }
  }


  useEffect(() => {
    loadUserState()

    let lastUserId: string | null = null;

    const unsubscribe = authApi.onAuthStateChange((_event, session) => {
      const eventUserId = session?.user?.id ?? null

      // Only act if the user actually changed from last event
      if (eventUserId !== lastUserId) {
        lastUserId = eventUserId; // Update for next event

        if (eventUserId) {
          loadUserState()
        } else {
          setUser(null)
          setIsSignedIn(false)
          setUserRole(null)
          dispatch(resetState())
        }
      }
    })
    return () => unsubscribe()
  }, [])


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