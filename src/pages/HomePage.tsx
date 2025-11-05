import { useState, useEffect } from 'react'
import { PageContainer, Heading, Loading, Error } from "@/components";
import { RecipeList } from "@/features/recipeList/components";
import { Filters } from '@/features/filters/components'
import { fetchRecipesAPI } from '@/utils/backend/api/recipes';
import { getCuisines, getMainIngredients } from '@/utils/backend/api/filters';
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
      <Filters />
      <div className="my-3 px-3">
        <Heading title="Recipes" />
        <div className="">
          {loading ?
            <Loading />
            : error ?
              <Error /> :
              <>
                <RecipeList recipeList={recipeList} />
              </>}
        </div>
      </div>
    </PageContainer>
  );

}

export default HomePage;