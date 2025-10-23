import { supabase } from "@/utils/backend/db/client";
import { DB_TABLES } from "@/utils/backend/constants";
import { InsertRecipeCuisine, InsertRecipeMainIngredient } from "../types";

export const insertRecipeMainIngredients = async (
  recipeId: string,
  mainIngredientIds: string[]
) => {
  if (!mainIngredientIds.length) return;
  const rows: InsertRecipeMainIngredient[] = mainIngredientIds.map((id) => ({
    recipe_id: recipeId,
    main_ingredient_id: id,
  }));

  const { error } = await supabase.from(DB_TABLES.RECIPE_MAIN_INGREDIENTS).insert(rows);
  if (error) throw error;
};

export const insertRecipeCuisines = async (
  recipeId: string,
  cuisineIds: string[]
) => {
  if (!cuisineIds.length) return;
  const rows: InsertRecipeCuisine[] = cuisineIds.map((id) => ({
    recipe_id: recipeId,
    cuisine_id: id,
  }));

  const { error } = await supabase.from(DB_TABLES.RECIPE_CUISINES).insert(rows);
  if (error) throw error;
};