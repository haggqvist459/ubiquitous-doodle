import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const dispatch = useAppDispatch()

  const loadUserState = async () => {
    try {
      const session = await authApi.getSession()
      const currentUser = session?.user ?? null

      setUser(currentUser)
      setIsSignedIn(!!session)

      if (currentUser) {
        const fetchedUserRole = await authApi.getUserRoleAPI(currentUser.id)
        setUserRole(fetchedUserRole)

        const favourites = await getAllFavouritesAPI(currentUser.id)
        dispatch(setFavourites(favourites))
      }

    } catch (error) {
      console.error("AuthContext, loadUserState error:", error)
    }
  }

  useEffect(() => {

    const unsubscribe = authApi.onAuthStateChange((event) => {

      switch (event) {
        case 'INITIAL_SESSION':
          loadUserState()
          break;
        case 'SIGNED_IN':
          if (!user) loadUserState()
          break;
        case 'SIGNED_OUT':
          setUser(null)
          setIsSignedIn(false)
          dispatch(resetState())
          break;
        default:
          break;
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