import { supabase } from "../client";
import { DB_TABLES } from "@/utils/backend/constants";

export const fetchRecipesWithRelationsFromDB = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("No active Supabase session");

  const selectRelations = `
  *,
  ${DB_TABLES.RECIPE_MAIN_INGREDIENTS} (
    ${DB_TABLES.MAIN_INGREDIENTS} (*)
  ),
  ${DB_TABLES.RECIPE_CUISINES} (
    ${DB_TABLES.CUISINES} (*)
  )
`;

  const { data, error } = await supabase
    .from(DB_TABLES.RECIPES)
    .select(selectRelations);

  if (error) throw error;
  return data;
};