import { supabase } from "@/utils/backend/db/client";
import { FilterOptionType, LanguageType } from "../../types/types";
import { DB_TABLES, DB_COLUMNS } from "@/utils/backend/constants";
import { handleError } from "../../utils";

export const selectMainIngredients = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {

    const selectedColumns: string[] = ['id']
    
    const columnSelection = `${DB_COLUMNS.MAIN_INGREDIENTS.ID}, ${language}_text:text`

    let query = supabase.from(DB_TABLES.MAIN_INGREDIENTS).select()

    const { data, error } = await supabase
      .from(DB_TABLES.MAIN_INGREDIENTS)
      .select(columnSelection);

    if (error) throw error;
    if (data.length === 0) throw new Error("No data returned from main_ingredients");
    return data as FilterOptionType[];

  } catch (error) {
    return handleError(error, 'selectMainIngredients')
  }

};

export const selectCuisines = async (language: LanguageType): Promise<FilterOptionType[]> => {

  try {

    const { data, error } = await supabase
      .from(DB_TABLES.CUISINES)
      .select()

    if (error) throw error;
    if (data.length === 0) throw new Error("No data returned from cuisines");
    return data as FilterOptionType[];

  } catch (error) {
    return handleError(error, 'selectCuisines')
  }

};