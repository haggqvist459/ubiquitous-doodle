import { FilterOptionType } from "@/types"

type SortingFilter = 'None' | 'NameAsc' | 'NameDesc' | 'CreatedAsc' | 'CreatedDesc'


export type FilterStateType = {
  typeFilters: FilterOptionType[] | []
  selectedTypeFilters: FilterOptionType[] | []
  cuisineFilters: FilterOptionType[] | []
  selectedCuisineFilters: FilterOptionType[] | []
  sortingFilters:  SortingFilter[]
  selectedSortingFilter: SortingFilter
}