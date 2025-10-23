import type { RecipeDraftType } from "@/features/recipeForm/types";

export const mapRecipeDraftToDb = (draft: RecipeDraftType) => {
  return {
    title: draft.title,
    subtitle: draft.subtitle?.trim() || null,
    include_weekly: draft.includeWeekly,     
    ingredients: draft.ingredients,          
    instructions: draft.instructions,        
  };
};