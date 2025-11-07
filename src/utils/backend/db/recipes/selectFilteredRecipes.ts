import { supabase } from "../client";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { DbRecipeWithRelations, SortingFilterType } from "../../types";

const sortConfigMap: Record<SortingFilterType, { column?: string; ascending?: boolean }> = {
  "None": {},
  "Name A-Z": { column: DB_COLUMNS.RECIPES.TITLE, ascending: true },
  "Name Z-A": { column: DB_COLUMNS.RECIPES.TITLE, ascending: false },
  "Newest": { column: DB_COLUMNS.RECIPES.TITLE, ascending: false },
  "Oldest": { column: DB_COLUMNS.RECIPES.TITLE, ascending: true },
};


export const selectFilteredRecipes = async ({
  typeIds,
  cuisineIds,
  sortingFilter,
}: {
  typeIds?: string[];
  cuisineIds?: string[];
  sortingFilter: SortingFilterType;
}): Promise<DbRecipeWithRelations[]> => {

  try {
    const selectParts: string[] = ["*"];
    if (typeIds?.length) selectParts.push(`${DB_TABLES.RECIPE_MAIN_INGREDIENTS}!inner(${DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID})`);
    if (cuisineIds?.length) selectParts.push(`${DB_TABLES.RECIPE_CUISINES}!inner(${DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID})`);
    const selectClause: string = selectParts.join(", ");

    let query = supabase
      .from(DB_TABLES.RECIPES)
      .select<string, DbRecipeWithRelations>(selectClause);


    if (typeIds?.length) query = query.in(`${DB_TABLES.RECIPE_MAIN_INGREDIENTS}.${DB_COLUMNS.RECIPE_MAIN_INGREDIENTS.MAIN_INGREDIENT_ID}`, typeIds)
    if (cuisineIds?.length) query = query.in(`${DB_TABLES.RECIPE_CUISINES}.${DB_COLUMNS.RECIPE_CUISINES.CUISINE_ID}`, cuisineIds)

    const sortConfig = sortConfigMap[sortingFilter];

    if (sortConfig.column) query = query.order(sortConfig.column, { ascending: sortConfig.ascending });

    const { data, error } = await query;
    if (error) throw error;

    return data;

  } catch (error) {
    throw error
  }

}