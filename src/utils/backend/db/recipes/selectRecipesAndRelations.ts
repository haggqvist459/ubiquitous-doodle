import { supabase } from "../client";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { DbRecipeWithRelations, LanguageType } from "../../types";
import { handleError } from "../../utils";


export const fetchRecipesWithRelationsFromDB = async (language: LanguageType): Promise<DbRecipeWithRelations[]> => {

  try {

    const { data, error } = await supabase
      .from(DB_TABLES.RECIPES)
      .select<string, DbRecipeWithRelations>(`
  *,
  ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
    ${DB_TABLES.MAIN_INGREDIENTS} (
      ${DB_COLUMNS.MAIN_INGREDIENTS.ID},
      text:${language}_text
    )
  ),
  ${DB_TABLES.RECIPE_CUISINES} (
    ${DB_TABLES.CUISINES} (
      ${DB_COLUMNS.CUISINES.ID},
      text:${language}_text
    )
  )
`)

    if (error) throw error;
    if (data.length === 0) throw new Error("No recipes found or access denied");
    return data;

  } catch (error) {
    return handleError(error, 'fetchRecipesWithRelationsFromDB')
  }

};