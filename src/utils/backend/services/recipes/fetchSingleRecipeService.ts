import { selectSingleRecipe } from "../../db";
import { mapRecipeDbToUI } from "./mapRecipeUI";
import { RecipeType } from "../../types";
import { handleError } from "../../utils";

export const fetchSingleRecipeService = async (id: string): Promise<RecipeType> => {

  try {
    const dbData = await selectSingleRecipe(id)
    return mapRecipeDbToUI(dbData)
  } catch (error) {
    return handleError(error, 'fetchSingleRecipeService')
  }
  
}