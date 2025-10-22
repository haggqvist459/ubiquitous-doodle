import { supabase } from "@/utils/backend/db/client";
import { FilterOptionType } from "./types";

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {
  const { data, error } = await supabase
    .from("main_ingredients")
    .select("id, name")
    // .order("name", { ascending: true });

  if (error) throw error;
  if (!data) throw new Error("No data returned from main_ingredients");

  return data as FilterOptionType[];
};

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {
  const { data, error } = await supabase
    .from("cuisines")
    .select("id, name")
    // .order("name", { ascending: true });

  if (error) throw error;
  if (!data) throw new Error("No data returned from main_ingredients");
  return data as FilterOptionType[];
};