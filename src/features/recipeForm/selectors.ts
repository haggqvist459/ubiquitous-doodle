import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const selectMetadata = createSelector(
  (state: RootState) => state.recipeForm.recipeDraft,
  (recipeDraft) => ({
    title: recipeDraft.title,
    subtitle: recipeDraft.subtitle,
    type: recipeDraft.type,
    cuisine: recipeDraft.cuisine,
    includeWeekly: recipeDraft.includeWeekly,
  })
);

export const SelectIngredients = createSelector(
  (state: RootState) => state.recipeForm.recipeDraft,
  (recipeDraft) => ({
    ingredients: recipeDraft.ingredients
  })
)

export const selectInstructions = createSelector(
  (state: RootState) => state.recipeForm.recipeDraft,
  (recipeDraft) => ({
    instructions: recipeDraft.instructions
  })
)