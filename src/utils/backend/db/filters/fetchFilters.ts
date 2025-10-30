import { supabase } from "@/utils/backend/db/client";
import { FilterOptionType } from "../../types/types";
import { DB_TABLES } from "@/utils/backend/constants";

export const fetchMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    const { data, error } = await supabase
      .from(DB_TABLES.MAIN_INGREDIENTS)
      .select();

    if (error) throw error;
    if (data.length === 0) throw new Error("No data returned from main_ingredients");
    return data as FilterOptionType[];

  } catch (error) {
    throw error
  }

};

export const fetchCuisines = async (): Promise<FilterOptionType[]> => {

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No active Supabase session");

    const { data, error } = await supabase
      .from(DB_TABLES.CUISINES)
      .select()

    if (error) throw error;
    if (data.length === 0) throw new Error("No data returned from cuisines");
    return data as FilterOptionType[];

  } catch (error) {
    throw error
  }

};