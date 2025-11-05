import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FilterStateType } from "./types";
import { FilterOptionType } from "@/types";


const initialState: FilterStateType = {
  typeFilters: [],
  cuisineFilters: [],
  sortingFilters: [],
  selectedTypeFilters: [],
  selectedCuisineFilters: [],
  selectedSortingFilter: 'None'
}


const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilterList: (
      state,
      action: PayloadAction<{
        filterCategory: "types" | "cuisines";
        list: FilterOptionType[];
      }>
    ) => {
      switch (action.payload.filterCategory) {
        case 'types':
          state.typeFilters = action.payload.list;
          break;
        case 'cuisines':
          state.cuisineFilters = action.payload.list;
          break;
        default:
          console.error("filterSlice - setFilterList error: incorrect filterCategory")
          break;
      }
    },
    setActiveFilter: () => {},
    setActiveSorting: () => {},
    resetState: () => initialState
  }
})

export const { setFilterList, setActiveFilter, setActiveSorting, resetState } = filterSlice.actions
export default filterSlice.reducer