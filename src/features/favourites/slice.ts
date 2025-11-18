import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FavouriteType, FavouriteSliceType } from "./types";


const initialState: FavouriteSliceType = {
  favouriteList: []
}

const favouriteSlice = createSlice({
  name: 'favouriteSlice',
  initialState,
  reducers: {
    setFavourites: (
      state,
      action: PayloadAction<FavouriteType[]>
    ) => {
      state.favouriteList = action.payload
    },
    addFavourite: (
      state,
      action: PayloadAction<FavouriteType>
    ) => {
      state.favouriteList.push(action.payload)
    },
    removeFavourite: (
      state,
      action: PayloadAction<string>
    ) => {
     state.favouriteList = state.favouriteList.filter(favourite => favourite.recipeId !== action.payload)
    },
    resetState: () => initialState
  }
})

export const { setFavourites, resetState, removeFavourite, addFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer