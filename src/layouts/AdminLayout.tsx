import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/supabase/supabaseClient";
import { AuthPage } from '@/pages'
import { FadeWrapper } from '@/components'



const AdminLayout = () => {

  const location = useLocation()
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
    });

    // Initial check (for reloads)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsSignedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isSignedIn === null) {
    // Optional: Show a loading indicator while checking auth
    return null;
  }

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col relative">
      <div className="flex-grow">
        <FadeWrapper key={location.pathname}>
          {isSignedIn ? <Outlet /> : <AuthPage />}
        </FadeWrapper>
      </div>
    </div>
  )
}

export default AdminLayout;