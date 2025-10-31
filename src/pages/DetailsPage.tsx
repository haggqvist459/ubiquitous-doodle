import { PageContainer } from "@/components";
import { useLocation } from "react-router-dom";
import { RecipeType } from "@/types";
import { RecipeDetails } from "@/features/recipeList/components";

const DetailsPage = () => {

  const location = useLocation();
  const { recipe } = location.state as { recipe: RecipeType };

  return (
    <PageContainer>
      <RecipeDetails recipe={recipe}/>
    </PageContainer>
  )
}

export default DetailsPage;