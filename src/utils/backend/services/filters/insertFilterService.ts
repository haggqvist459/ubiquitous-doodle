import { insertRecipeCuisines, insertRecipeMainIngredients } from "@/utils/backend/db";
import { handleError } from "../../utils";

export const attachRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
): Promise<void> => {

  if (!mainIngredientIds?.length) {
    throw new Error("attachRecipeMainIngredients called without any IDs");
  }

  try {
    await insertRecipeMainIngredients(recipeId, mainIngredientIds);
  } catch (error) {
    handleError(error, 'attachRecipeMainIngredients')
  }
};

export const attachRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
): Promise<void> => {
  if (!cuisineIds?.length) {
    throw new Error("attachRecipeCuisines called without any IDs");
  }

  try {
    await insertRecipeCuisines(recipeId, cuisineIds);
  } catch (error) {
    handleError(error, 'attachRecipeCuisines')
  }
};