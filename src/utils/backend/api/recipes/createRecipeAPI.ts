import { processRecipe } from "@/utils/backend/services/recipes/createRecipeService";
import type { RecipeDraftType } from "@/features/recipeForm/types";
import { handleError } from "../../utils";

export const createRecipe = async (draft: RecipeDraftType): Promise<string> => {
  try {
    const data = await processRecipe(draft);
    return data
  } catch (error) {
    return handleError(error, 'createRecipe');
  }
};