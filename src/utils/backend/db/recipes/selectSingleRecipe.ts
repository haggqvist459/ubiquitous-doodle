import { supabase } from "../client";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { DbRecipeWithRelations } from "../../types";

export const selectSingleRecipe = async (
  id: string
): Promise<DbRecipeWithRelations> => {

  try {
    const { data, error } = await supabase
      .from(DB_TABLES.RECIPES)
      .select(`
        *,
        ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (${DB_TABLES.MAIN_INGREDIENTS} (*)),
        ${DB_TABLES.RECIPE_CUISINES} (${DB_TABLES.CUISINES} (*))
      `)
      .eq(DB_COLUMNS.RECIPES.ID, id)
      .single()

    if (error) throw error

    return data;

  } catch (error) {

    if (error instanceof Error) {
      console.error('[selectSingleRecipe] Error:', error.message, error.stack);
      throw new Error(`selectSingleRecipe failed: ${error.message}`);
    } else {
      console.error('[selectSingleRecipe] Non-Error thrown:', error);
      throw new Error('selectSingleRecipe failed: Unknown error');
    }
  }
}