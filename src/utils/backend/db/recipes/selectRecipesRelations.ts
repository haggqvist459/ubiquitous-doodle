import { supabase } from "../client";
import { DB_TABLES } from "@/utils/backend/constants";
import { DbRecipeWithRelations } from "../../types";


export const fetchRecipesWithRelationsFromDB = async (): Promise<DbRecipeWithRelations[]> => {

  try {
    const { data, error } = await supabase
      .from(DB_TABLES.RECIPES)
      .select(`
    *,
    recipe_main_ingredients (
      main_ingredients (*)
    ),
    recipe_cuisines (
      cuisines (*)
    )
  `);

    if (error) throw error;
    if (data.length === 0) throw new Error("No recipes found or access denied");
    return data as DbRecipeWithRelations[];

  } catch (error) {
    throw error
  }






};