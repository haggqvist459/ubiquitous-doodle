import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthPage } from "@/pages";
import { FadeWrapper } from "@/components";
import * as authApi from "@/utils/backend/api/auth";

const AdminLayout = () => {
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // initial session check
    authApi.getSession().then((res) => {
      setIsSignedIn(res.success && !!res.session);
    });

    // subscribe to auth changes
    const unsubscribe = authApi.onAuthStateChange((signedIn) => {
      setIsSignedIn(signedIn);
    });

    return () => unsubscribe();
  }, []);

  if (isSignedIn === null) return null;

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col relative">
      <div className="flex-grow">
        <FadeWrapper key={location.pathname}>
          {isSignedIn ? <Outlet /> : <AuthPage />}
        </FadeWrapper>
      </div>
    </div>
  );
};

export default AdminLayout;