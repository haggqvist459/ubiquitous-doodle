import { supabase } from "../client";
import { DB_TABLES, DB_TABLE_ROWS } from "@/utils/backend/constants";
import { InsertRecipeType } from "../../types";

export const insertRecipe = async (recipe: InsertRecipeType) => {

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    const { data, error } = await supabase
      .from(DB_TABLES.RECIPES)
      .insert([recipe])
      .select(DB_TABLE_ROWS.RECIPES.ID)
      .single();

    if (error) throw error;
    if (!data || !data.id) throw new Error('Insert succeeded but no ID returned');
    return data.id as string;

  } catch (error) {
    throw error
  }


};