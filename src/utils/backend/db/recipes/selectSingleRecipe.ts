import { supabase } from "../client";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { DbRecipeWithRelations, LanguageType } from "../../types";
import { handleError } from "../../utils";

export const selectSingleRecipe = async (
  id: string,
  language: LanguageType
): Promise<DbRecipeWithRelations> => {

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
      .eq(DB_COLUMNS.RECIPES.ID, id)
      .single()

    if (error) throw error

    return data

  } catch (error) {
    return handleError(error, 'selectSingleRecipe')
  }
}
