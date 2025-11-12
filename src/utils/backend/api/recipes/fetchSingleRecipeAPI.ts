import { fetchSingleRecipeService } from "../../services";
import { RecipeType } from "../../types";
import { handleError } from "../../utils";

export const fetchSingleRecipeAPI = async (id: string): Promise<RecipeType> => {

  try {
    const recipe = await fetchSingleRecipeService(id)
    return recipe
  } catch (error) {
    return handleError(error, 'fetchSingleRecipeAPI')
  }

}