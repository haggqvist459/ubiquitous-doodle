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
    updateField: () => {

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

export const { updateField, addIngredient, removeIngredient, addInstruction, removeInstruction, setCurrentSection } = recipeFormSlice.actions
export default recipeFormSlice.reducer