import { selectSingleRecipe } from "../../db";
import { mapRecipeDbToUI } from "./mapRecipeUI";
import { LanguageType, RecipeType } from "../../types";
import { handleError } from "../../utils";

export const fetchSingleRecipeService = async (id: string, language: LanguageType): Promise<RecipeType> => {

  try {
    const dbData = await selectSingleRecipe(id, language)
    return mapRecipeDbToUI(dbData)
  } catch (error) {
    return handleError(error, 'fetchSingleRecipeService')
  }
  
}