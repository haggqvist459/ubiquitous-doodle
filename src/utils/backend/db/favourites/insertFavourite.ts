import { supabase } from "../client";
import { DB_COLUMNS } from "@/utils/backend/constants";
import { Tables } from "../../types/database.types";

export const insertFavourite = async (uid: string, recipeId: string): Promise<Tables<'favourites'>> => {
  const { data } = await supabase
    .from('favourites')
    .insert({
      [DB_COLUMNS.FAVOURITES.USER_ID]: uid,
      [DB_COLUMNS.FAVOURITES.RECIPE_ID]: recipeId
    })
    .select()
    .single()
    .throwOnError()

    return data 
}