import { FilterOptionType, RecipeType, SortingFilterKey } from "../../types";
import { selectFilteredRecipes } from "@/utils/backend/db/recipes";
import { mapRecipesDbToUI } from './mapRecipeUI'
import { handleError } from "../../utils";

export const fetchFilteredRecipesService = async ({
  typeFilters,
  cuisineFilters,
  sortingFilter
}: {
  typeFilters?: FilterOptionType[]
  cuisineFilters?: FilterOptionType[]
  sortingFilter: SortingFilterKey
}): Promise<RecipeType[]> => {

  const typeIds = typeFilters?.map((type) => type.id);
  const cuisineIds = cuisineFilters?.map((cuisine) => cuisine.id);

  try {
    const dbData = await selectFilteredRecipes({typeIds, cuisineIds, sortingFilter});
    return mapRecipesDbToUI(dbData)
  } catch (error) {
    return handleError(error, 'fetchFilteredRecipesService')
  }
}