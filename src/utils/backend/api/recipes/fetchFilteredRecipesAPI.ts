import { SortingFilterKey, FilterOptionType, RecipeType } from "../../types"
import { fetchFilteredRecipesService } from "../../services/recipes/fetchFilteredRecipesService"
import { handleError } from "../../utils"

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
    return handleError(error, 'fetchFilteredRecipesAPI')
  }
}