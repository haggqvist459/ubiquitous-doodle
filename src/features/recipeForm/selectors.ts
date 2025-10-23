import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const selectMetadata = createSelector(
  (state: RootState) => state.recipeForm.recipeDraft,
  (recipeDraft) => ({
    title: recipeDraft.title,
    subtitle: recipeDraft.subtitle,
    types: recipeDraft.types,
    cuisines: recipeDraft.cuisines,
    includeWeekly: recipeDraft.includeWeekly,
  })
);

export const selectIngredients = (state: RootState) =>
  state.recipeForm.recipeDraft.ingredients;

export const selectInstructions = (state: RootState) =>
  state.recipeForm.recipeDraft.instructions;