import { insertRecipe } from "@/utils/backend/db";
import { mapRecipeDraftToDb } from "./mapRecipeDraft";
import type { RecipeDraftType } from "@/features/recipeForm/types";
import { attachRecipeCuisines, attachRecipeMainIngredients } from "../filters";

export const processRecipe = async (draft: RecipeDraftType) => {
  if (!draft.title.trim()) throw new Error("Recipe title is required.");
  if (
    draft.ingredients.length === 0 ||
    draft.ingredients.some((i) => !i.name.trim() || !i.amount.trim() || i.unit === "")
  ) {
    throw new Error("Each ingredient must have a name, amount, and unit.");
  }
  if (
    draft.instructions.length === 0 ||
    draft.instructions.some((i) => !i.title.trim() || !i.text.trim())
  ) {
    throw new Error("Each instruction must have a title and description.");
  }

  try {
    const dbRecipe = mapRecipeDraftToDb(draft);
    const recipeId = await insertRecipe(dbRecipe);
    if (draft.types) {
      const typeIds = draft.types.map(type => type.id);
      await attachRecipeMainIngredients(recipeId, typeIds)
    }
    if (draft.cuisines) {
      const cuisineIds = draft.cuisines.map(cuisine => cuisine.id)
      await attachRecipeCuisines(recipeId, cuisineIds)
    }
    
    return recipeId;
  } catch (error) {
    console.error("Recipe creation failed:", error);
    throw new Error("Recipe creation failed — database changes may be incomplete.");
  }
};