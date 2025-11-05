import { FilterOptionType } from "@/types"
import { SORTING_FILTERS } from "./constants";


export type SortingFilterType = (typeof SORTING_FILTERS)[number];

export type FilterStateType = {
  typeFilters: FilterOptionType[] | []
  selectedTypeFilters: FilterOptionType[] | []
  cuisineFilters: FilterOptionType[] | []
  selectedCuisineFilters: FilterOptionType[] | []
  sortingFilters:  SortingFilterType[]
  selectedSortingFilter: SortingFilterType
}