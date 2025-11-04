import { useState, useEffect } from 'react'
import { PageContainer, Header, Loading, Error } from "@/components";
import { RecipeList } from "@/features/recipeList/components";
import { fetchRecipesAPI } from '@/utils/backend/api/recipes';
import { RecipeType } from '@/types';




const HomePage = () => {

  const [recipeList, setRecipeList] = useState<RecipeType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadRecipes = async () => {

      setLoading(true);
      setError(false)
      try {
        const fetchedRecipes = await fetchRecipesAPI();
        if (fetchedRecipes.data) {
          setRecipeList(fetchedRecipes.data);
        }

      } catch (error) {
        console.error("Failed to load recipes:", error);
        setError(true)
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);


  return (
    <PageContainer>
      <Header title="Recipes" />
      <div className="">
        {loading ?
          <Loading />
          : error ?
            <Error /> :
            <>
              <RecipeList recipeList={recipeList} />
            </>}
      </div>
    </PageContainer>
  );

}

export default HomePage;