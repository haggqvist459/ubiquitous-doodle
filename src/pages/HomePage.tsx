import { useState, useEffect } from 'react'
import { PageContainer, Header, Loading, Error } from "@/components";
import { RecipeList } from "@/features/recipeList/components";
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
      <div className="px-3 w-full h-9 bg-primary flex items-center justify-center space-x-5">
        <button>
          Types
        </button>
        <button>
          Cuisines
        </button>
        <button>
          Sort by
        </button>
      </div>
      <div className="my-3 px-3">
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
      </div>
    </PageContainer>
  );

}

export default HomePage;