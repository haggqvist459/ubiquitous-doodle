export const DB_TABLES = {
  RECIPES: 'recipes',
  RECIPE_MAIN_INGREDIENTS: 'recipe_main_ingredients',
  RECIPE_CUISINES: 'recipe_cuisines',
  CUISINES: 'cuisines',
  MAIN_INGREDIENTS: 'main_ingredients',
  USER_ROLES: 'user_roles'
} as const

export const DB_TABLE_ROWS = {
  RECIPES: {
    ID: 'id',
    TITLE: 'title',
    SUBTITLE: 'subtitle',
    INGREDIENTS: 'ingredients',
    CREATED_AT: 'created_at',
    INSTRUCTIONS: 'instructions',
    INCLUDE_WEEKLY: 'include_weekly',
  },
  RECIPE_MAIN_INGREDIENTS: {
    RECIPE_ID: 'recipe_id',
    MAIN_INGREDIENT_ID: 'main_ingredient_id'
  },
  RECIPE_CUISINES: {
    RECIPE_ID: 'recipe_id',
    CUISINE_ID: 'cuisine_id'
  },
  CUISINES: {
    ID: 'id',
    NAME: 'name'
  },
  MAIN_INGREDIENTS: {
    ID: 'id',
    NAME: 'name'
  },
  USER_ROLES: {
    ID: 'id',
    CREATED_AT: 'created_at',
    USER_ID: 'user_id',
    ROLE: 'role'
  }
} as const