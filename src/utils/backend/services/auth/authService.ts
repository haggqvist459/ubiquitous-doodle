import { supabase } from "@/utils/backend/db/client";
import { UserRoleType } from "../../types";
import { selectUserRole } from "../../db/auth/getUserRole";

export const signIn = async (email: string, password: string) => {
 
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error
    return data;

};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error
  return data.session;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error
  return data.user;
};

export const onAuthStateChange = (callback: (isSignedIn: boolean) => void) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(!!session);
  });
  return () => data.subscription.unsubscribe();
};

export const getUserRoleService = async (uid: string): Promise<UserRoleType> => {

  try {
    const data = await selectUserRole(uid)
    return data
  } catch (error) {
    throw error
  }
}