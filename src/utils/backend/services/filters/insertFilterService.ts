import { insertRecipeCuisines, insertRecipeMainIngredients } from "@/utils/backend/db";

export const attachRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
) => {
  
  if (!mainIngredientIds?.length) {
    throw new Error("attachRecipeMainIngredients called without any IDs");
  }

  try {
    await insertRecipeMainIngredients(recipeId, mainIngredientIds);
  } catch (error) {
    console.error("Failed to insert recipe main ingredients:", error);
    throw error;
  }
};

export const attachRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
) => {
  if (!cuisineIds?.length) {
    throw new Error("attachRecipeCuisines called without any IDs");
  }

  try {
    await insertRecipeCuisines(recipeId, cuisineIds);
  } catch (error) {
    console.error("Failed to insert recipe cuisines:", error);
    throw error;
  }
};