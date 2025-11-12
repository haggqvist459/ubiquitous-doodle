import { selectSingleRecipe } from "../../db";
import { mapRecipeDbToUI } from "./mapRecipeUI";

export const fetchSingleRecipeService = async (id: string) => {

  try {
    const dbData = await selectSingleRecipe(id)
    return mapRecipeDbToUI(dbData)
  } catch (error) {
    if (error instanceof Error) {
      console.error('[fetchSingleRecipeService] Error:', error.message, error.stack);
      throw new Error(`fetchSingleRecipeService failed: ${error.message}`);
    } else {
      console.error('[fetchSingleRecipeService] Non-Error thrown:', error);
      throw new Error('fetchSingleRecipeService failed: Unknown error');
    }
  }
}