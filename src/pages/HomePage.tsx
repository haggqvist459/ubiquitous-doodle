import { PageContainer, Header } from "@/components";
import { RecipeList } from "@/features/recipeList/components";


const HomePage = () => {

  return (
    <PageContainer>
      <Header title="Recipes"/>
      <RecipeList />
    </PageContainer>
  );
  
}

export default HomePage;