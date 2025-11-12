import { RecipeType, DbRecipeWithRelations, InstructionType, IngredientType } from '../../types'

export const mapRecipesDbToUI = (dbRecipes: DbRecipeWithRelations[]): RecipeType[] => {
  return dbRecipes.map((dbRecipe) => {
    const safeMainIngredients = Array.isArray(dbRecipe.recipes_main_ingredients)
      ? dbRecipe.recipes_main_ingredients
      : []
    const safeCuisines = Array.isArray(dbRecipe.recipes_cuisines)
      ? dbRecipe.recipes_cuisines
      : []

    const mappedTypes = safeMainIngredients.map((relation) => ({
      id: relation.main_ingredients.id,
      name: relation.main_ingredients.name,
    }))

    const mappedCuisines = safeCuisines.map((relation) => ({
      id: relation.cuisines.id,
      name: relation.cuisines.name,
    }))

    const mappedInstructions = Array.isArray(dbRecipe.instructions)
      ? (dbRecipe.instructions as InstructionType[])
      : []

    const mappedIngredients = Array.isArray(dbRecipe.ingredients)
      ? (dbRecipe.ingredients as IngredientType[])
      : []

    return {
      id: dbRecipe.id,
      createdAt: new Date(dbRecipe.created_at),
      title: dbRecipe.title,
      description: dbRecipe.description ?? '',
      includeWeekly: dbRecipe.include_weekly,
      types: mappedTypes,
      cuisines: mappedCuisines,
      instructions: mappedInstructions,
      ingredients: mappedIngredients,
    }
  })
}

export const mapRecipeDbToUI = (dbRecipe: DbRecipeWithRelations): RecipeType => {
  const safeMainIngredients = Array.isArray(dbRecipe.recipes_main_ingredients)
    ? dbRecipe.recipes_main_ingredients
    : [];
  const safeCuisines = Array.isArray(dbRecipe.recipes_cuisines)
    ? dbRecipe.recipes_cuisines
    : [];

  const mappedTypes = safeMainIngredients.map((relation) => ({
    id: relation.main_ingredients.id,
    name: relation.main_ingredients.name,
  }));

  const mappedCuisines = safeCuisines.map((relation) => ({
    id: relation.cuisines.id,
    name: relation.cuisines.name,
  }));

  const mappedInstructions = Array.isArray(dbRecipe.instructions)
    ? (dbRecipe.instructions as InstructionType[])
    : [];

  const mappedIngredients = Array.isArray(dbRecipe.ingredients)
    ? (dbRecipe.ingredients as IngredientType[])
    : [];

  return {
    id: dbRecipe.id,
    createdAt: new Date(dbRecipe.created_at),
    title: dbRecipe.title,
    description: dbRecipe.description ?? '',
    includeWeekly: dbRecipe.include_weekly,
    types: mappedTypes,
    cuisines: mappedCuisines,
    instructions: mappedInstructions,
    ingredients: mappedIngredients,
  };
};