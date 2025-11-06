import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import type { SortingFilterType } from "../../types";

export const buildSelectParts = (typeIds?: string[], cuisineIds?: string[]): string[] => {
  const selectParts: string[] = ["*"];

  if (typeIds?.length) selectParts.push(`${DB_TABLES.RECIPE_MAIN_INGREDIENTS}!inner(${DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID})`);

  if (cuisineIds?.length) selectParts.push(`${DB_TABLES.RECIPE_CUISINES}!inner(${DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID})`);

  return selectParts;
};

export const getFilterPaths = (typeIds?: string[], cuisineIds?: string[]) => {
  const filterPaths: { typePath?: string; cuisinePath?: string } = {};

  if (typeIds?.length) filterPaths.typePath = `${DB_TABLES.RECIPE_MAIN_INGREDIENTS}.${DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID}`;
  if (cuisineIds?.length) filterPaths.cuisinePath = `${DB_TABLES.RECIPE_CUISINES}.${DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID}`;

  return filterPaths;
};

export const getSortColumn = (
  sorting?: SortingFilterType,
  sortConfigMap?: Record<string, { column?: string; ascending?: boolean }>
) => {
  if (!sorting || !sortConfigMap) return undefined;

  const sortConfig = sortConfigMap[sorting];
  if (sortConfig?.column) {
    return {
      column: sortConfig.column,
      ascending: Boolean(sortConfig.ascending),
    };
  }

  return undefined;
};