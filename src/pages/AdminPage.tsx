import { useEffect, useState } from "react";
import { PageContainer } from "@/components";
// import { CreateRecipeForm } from "@/features/recipeForm";
import { CreateRecipeMobile, CreateRecipeDesktop } from "@/features/recipeForm/components";

const AdminPage = () => {

  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const handler = () =>
      setIsLargeScreen(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <PageContainer>
      {/* <CreateRecipeForm /> */}
      {isLargeScreen ? 
      <CreateRecipeDesktop />
      : <CreateRecipeMobile />  
    }
    </PageContainer>
  );
}

export default AdminPage;