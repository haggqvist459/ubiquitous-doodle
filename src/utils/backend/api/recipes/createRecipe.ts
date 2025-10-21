import { createRecipe as createRecipeService } from "@/utils/backend/services/recipes/createRecipe";
import type { RecipeDraftType } from "@/features/recipeForm/types";

export const createRecipe = async (draft: RecipeDraftType) => {
  try {
    const data = await createRecipeService(draft);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return { success: false, error: (error as Error).message };
  }
};