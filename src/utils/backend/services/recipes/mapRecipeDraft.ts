import type { RecipeDraftType } from "@/features/recipeForm/types";

export const mapRecipeDraftToDb = (draft: RecipeDraftType) => {
  return {
    title: draft.title,
    subtitle: draft.subtitle?.trim() || null,
    cuisine: draft.cuisine || null,
    main_ingredient: draft.type,             // rename
    include_weekly: draft.includeWeekly,     // rename
    ingredients: draft.ingredients,          // JSONB[]
    instructions: draft.instructions,        // JSONB[]
  };
};