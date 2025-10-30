import type { TablesInsert, Tables } from "@/types/database.types";

export type InsertRecipeType = TablesInsert<"recipes">;
export type InsertRecipeCuisine = TablesInsert<"recipe_cuisines">;
export type InsertRecipeMainIngredient = TablesInsert<"recipe_main_ingredients">;

export type DbRecipeWithRelations = Tables<'recipes'> & {
  recipes_cuisines: {
    cuisines: Tables<'cuisines'>
  }[]
  recipes_main_ingredients: {
    main_ingredients: Tables<'main_ingredients'>
  }[]
}