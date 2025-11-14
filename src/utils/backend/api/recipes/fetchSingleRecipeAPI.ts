import { fetchSingleRecipeService } from "../../services";
import { LanguageType, RecipeType } from "../../types";
import { handleError } from "../../utils";

export const fetchSingleRecipeAPI = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const recipe = await fetchSingleRecipeService(id, language)
    return recipe
  } catch (error) {
    return handleError(error, 'fetchSingleRecipeAPI')
  }

}