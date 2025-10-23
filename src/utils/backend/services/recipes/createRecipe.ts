import { insertRecipe } from "@/utils/backend/db";
import { mapRecipeDraftToDb } from "./mapRecipeDraft";
import type { RecipeDraftType } from "@/features/recipeForm/types";
import { attachRecipeFilters } from "../filters";

export const processRecipe = async (draft: RecipeDraftType) => {
  if (!draft.title.trim()) throw new Error("Recipe title is required.");
  if (draft.types === null) throw new Error("A main ingredient must be selected.");
  if (draft.cuisines === null) throw new Error("A cuisine filter must be selected");
  if (
    draft.ingredients.length === 0 ||
    draft.ingredients.some((i) => !i.name.trim() || !i.amount.trim() || i.unit === "-")
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
    await attachRecipeFilters(recipeId, draft.types, draft.cuisines);
    return recipeId;
  } catch (error) {
    console.error("Recipe creation failed:", error);
    throw new Error("Recipe creation failed — database changes may be incomplete.");
  }
};