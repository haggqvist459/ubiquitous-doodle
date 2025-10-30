import type { TablesInsert } from "@/types/database.types";

export type InsertRecipeType = TablesInsert<"recipes">;
export type InsertRecipeCuisine = TablesInsert<"recipe_cuisines">;
export type InsertRecipeMainIngredient = TablesInsert<"recipe_main_ingredients">;

export type FilterOptionType = {
  id: string;
  name: string;
};

export type RecipeListType = {
  title: string
  description: string
  
}