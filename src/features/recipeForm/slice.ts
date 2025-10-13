import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeFormState } from "./types";

const initialState: RecipeFormState = {
  recipeDraft: {
    title: "",
    subtitle: "",
    cuisine: null,
    type: null,
    includeWeekly: false,
    ingredients: [],
    instructions: []
  },
  currentSection: 'metadata'
}
const recipeFormSlice = createSlice({
  name: 'recipeFormSlice',
  initialState,
  reducers: {
    updateMetadataField: <
      K extends keyof RecipeFormState["recipeDraft"]
    >(
      state: RecipeFormState,
      action: PayloadAction<{ key: K; value: RecipeFormState["recipeDraft"][K] }>
    ) => {
      state.recipeDraft[action.payload.key] = action.payload.value
    },
    updateIngredientField: () => {

    },
    updateInstructionField: () => {

    },
    addIngredient: () => {

    },
    removeIngredient: () => {

    },
    addInstruction: () => {

    },
    removeInstruction: () => {

    },
    setCurrentSection: (state, action: PayloadAction<"metadata" | "ingredients" | "instructions">) => {
      state.currentSection = action.payload;
    },
  }
})

export const { 
  updateMetadataField,
  updateIngredientField,
  updateInstructionField, 
  addIngredient, 
  removeIngredient, 
  addInstruction, 
  removeInstruction, 
  setCurrentSection, } = recipeFormSlice.actions
export default recipeFormSlice.reducer