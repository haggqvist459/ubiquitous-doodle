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


  // const menuOptions = Object.values(DAY_KEYS).map((key) => (
  //   <button key={key} onClick={() => {}} className='text-primary-text font-semibold text-base hover:font-bold'>
  //     {DAY_TITLES[key]}
  //   </button>
  // ))


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