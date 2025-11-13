export const UNITS = ["tsp", "tbsp", "pcs", "g", "kg", "ml", "cl", "dl", "l", "pinch", "dash"] as const;

export const DB_TABLES = {
  RECIPES: 'recipes',
  RECIPE_MAIN_INGREDIENTS: 'recipe_main_ingredients',
  RECIPE_CUISINES: 'recipe_cuisines',
  CUISINES: 'cuisines',
  MAIN_INGREDIENTS: 'main_ingredients',
  USER_ROLES: 'user_roles'
} as const

export const DB_COLUMNS = {
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
    NAME: 'name',
    SV_TEXT: 'sv_text',
    EN_TEXT: 'en_text',
  },
  MAIN_INGREDIENTS: {
    ID: 'id',
    NAME: 'name',
    SV_TEXT: 'sv_text',
    EN_TEXT: 'en_text',
  },
  USER_ROLES: {
    ID: 'id',
    CREATED_AT: 'created_at',
    USER_ID: 'user_id',
    ROLE: 'role'
  }
} as const

export const SORTING_FILTERS = [
  "None",
  "Name A-Z",
  "Name Z-A",
  "Newest",
  "Oldest",
] as const;


export const LANGUAGES = [
  { code: 'sv', label: 'Svenska' },
  { code: 'en', label: 'English' }
] as const;

