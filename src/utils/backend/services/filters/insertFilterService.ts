import { insertRecipeCuisines, insertRecipeMainIngredients } from '@/utils/backend/db';

export const attachRecipeFilters = async (
  recipeId: string,
  mainIngredientIds: string[],
  cuisineIds: string[]
) => {
  try {
    await Promise.all([
      insertRecipeMainIngredients(recipeId, mainIngredientIds),
      insertRecipeCuisines(recipeId, cuisineIds),
    ]);
  } catch (error) {
    console.error("Failed to insert recipe filters:", error);
    throw error;
  }
};