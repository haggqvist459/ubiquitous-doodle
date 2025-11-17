import { SortingFilterKey, FilterOptionType, RecipeType } from "../../types"
import { fetchFilteredRecipesService } from "../../services/recipes/fetchFilteredRecipesService"

export const fetchFilteredRecipesAPI = async (
{
  typeFilters,
  cuisineFilters,
  sortingFilter
}:{
  typeFilters?: FilterOptionType[]
  cuisineFilters?: FilterOptionType[]
  sortingFilter: SortingFilterKey
}
): Promise<RecipeType[]> => {
  try {
    const data = await fetchFilteredRecipesService({typeFilters, cuisineFilters, sortingFilter})
    return data 
  } catch (error) {
    throw error
  }
}