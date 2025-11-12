import { useEffect, useState } from "react";
import { PageContainer, Error, Loading } from "@/components";
import { useLocation, useParams } from "react-router-dom";
import { RecipeType } from "@/types";
import { RecipeDetails } from "@/features/recipeList/components";
import { fetchSingleRecipeAPI } from "@/utils/backend/api/recipes/fetchSingleRecipeAPI";


const DetailsPage = () => {


  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(
    location.state?.recipe || null
  );
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (recipe) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);

        const recipe = await fetchSingleRecipeAPI(id!)
        setRecipe(recipe)

      } catch (error) {
        const typedError = error as Error;
        console.error('Error fetching recipe:', typedError.message);
        setErrorMessage(typedError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe, id]);



  return (
    <PageContainer>
      {loading ?
        <Loading />
        : recipe ?
          <RecipeDetails recipe={recipe} />
          :
          <Error />
      }
    </PageContainer>
  )
}

export default DetailsPage;