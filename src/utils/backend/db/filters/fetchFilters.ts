import { supabase } from "@/utils/backend/db/client";
import { FilterOptionType } from "../../types/types";
import { DB_TABLES } from "@/utils/backend/constants";

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {
  const { data, error } = await supabase
    .from(DB_TABLES.MAIN_INGREDIENTS)
    .select();
  
  if (error) throw error;
  if (!data) throw new Error("No data returned from main_ingredients");

  return data as FilterOptionType[];
};

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
  const { data, error } = await supabase
    .from(DB_TABLES.CUISINES)
    .select()

  if (error) throw error;
  if (!data) throw new Error("No data returned from cuisines");
  return data as FilterOptionType[];
};