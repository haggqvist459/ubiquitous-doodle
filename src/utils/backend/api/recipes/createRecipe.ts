import { processRecipe } from "@/utils/backend/services/recipes/createRecipeService";
import type { RecipeDraftType } from "@/features/recipeForm/types";

export const createRecipe = async (draft: RecipeDraftType) => {
  try {
    const data = await processRecipe(draft);
    return data
  } catch (error) {
    console.error("Failed to create recipe:", error);
    throw error 
  }
};