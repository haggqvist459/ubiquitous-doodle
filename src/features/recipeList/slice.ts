import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RecipeListType } from "./types";
import { RecipeType } from "@/types";

const initialState: RecipeListType = {
  recipeList: null
}

const recipeListSlice = createSlice({
  name: 'recipeListSlice',
  initialState,
  reducers:{
    setRecipeList: () => { },
    resetState: () => initialState
  }
})

export const { } = recipeListSlice.actions
export default recipeListSlice.reducer