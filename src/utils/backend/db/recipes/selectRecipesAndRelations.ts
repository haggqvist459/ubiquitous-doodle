import { supabase } from "../client";
import { DB_TABLES } from "@/utils/backend/constants";
import { DbRecipeWithRelations } from "../../types";


export const fetchRecipesWithRelationsFromDB = async (): Promise<DbRecipeWithRelations[]> => {

  try {

    const { data, error } = await supabase
      .from(DB_TABLES.RECIPES)
      .select(`
    *,
    ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
      ${DB_TABLES.MAIN_INGREDIENTS} (*)
    ),
    ${DB_TABLES.RECIPE_CUISINES} (
      ${DB_TABLES.CUISINES} (*)
    )
  `);

    if (error) throw error;
    if (data.length === 0) throw new Error("No recipes found or access denied");
    return data as DbRecipeWithRelations[];

  } catch (error) {
    throw error
  }






};