import { insertRecipe } from "@/utils/backend/db";
import { mapRecipeDraftToDb } from "./mapRecipeDraft";
import type { RecipeDraftType } from "@/features/recipeForm/types";

export const createRecipe = async (draft: RecipeDraftType) => {
  // --- validation ---
  if (!draft.title.trim()) {
    throw new Error("Recipe title is required.");
  }

  if (draft.type === null) {
    throw new Error("A main ingredient must be selected.");
  }

  if (
    draft.ingredients.length === 0 ||
    draft.ingredients.some(
      (i) => !i.name.trim() || !i.amount.trim() || i.unit === "-"
    )
  ) {
    throw new Error("Each ingredient must have a name, amount, and unit.");
  }

  if (
    draft.instructions.length === 0 ||
    draft.instructions.some(
      (i) => !i.title.trim() || !i.text.trim()
    )
  ) {
    throw new Error("Each instruction must have a title and description.");
  }

  // --- mapping ---
  const dbRecipe = mapRecipeDraftToDb(draft);

  // --- insert ---
  const result = await insertRecipe(dbRecipe);
  return result;
};