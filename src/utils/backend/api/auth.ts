import * as authService from "@/utils/backend/services/authService";

export async function signIn(email: string, password: string) {
  try {
    const data = await authService.signIn(email, password);
    return { success: true, data };
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function signOut() {
  try {
    await authService.signOut();
    return { success: true };
  } catch (error) {
    console.error("Sign-out failed:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getSession() {
  try {
    const session = await authService.getSession();
    return { success: true, session };
  } catch (error) {
    console.error("Get session failed:", error);
    return { success: false, error: (error as Error).message };
  }
}

export function onAuthStateChange(callback: (isSignedIn: boolean) => void) {
  return authService.onAuthStateChange(callback);
}