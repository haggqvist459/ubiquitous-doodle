import { supabase } from "../client";
import { Tables } from "../../types/database.types";
import { DB_COLUMNS } from "@/utils/backend/constants";

export const selectAllFavourites = async (uid: string): Promise<Tables<"favourites">[]> => {
  const { data } = await supabase
  .from('favourites')
  .select('*')
  .eq(DB_COLUMNS.FAVOURITES.USER_ID, uid)
  .throwOnError()

  return data
}