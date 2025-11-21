import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks';
import { fetchFilteredRecipesAPI } from '@/utils/backend/api/recipes';
import { RecipeType, } from '@/types';
import RecipeCard from './RecipeCard';
import { LoadingComponent, ErrorComponent } from "@/components";
import { useLanguage, } from '@/contexts';

const RecipeList = () => {

  const { language } = useLanguage()
  const selectedTypeFilters = useAppSelector(state => state.filters.selectedTypeFilters);
  const selectedCuisineFilters = useAppSelector(state => state.filters.selectedCuisineFilters);
  const selectedSortingFilter = useAppSelector(state => state.filters.selectedSortingFilter);

  const [recipeList, setRecipeList] = useState<RecipeType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setLoading(true);
    setError(false)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchFilteredRecipesAPI({
          sortingFilter: selectedSortingFilter,
          typeFilters: selectedTypeFilters,
          cuisineFilters: selectedCuisineFilters,
          language
        });

        setRecipeList(fetchedRecipes);

      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to load recipes:", error);
          setError(true)
          setErrorMessage(error.message)
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [selectedCuisineFilters, selectedTypeFilters, selectedSortingFilter]);


  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage={errorMessage} />;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-10'>
      {recipeList.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div >
  )
}

export default RecipeList;


