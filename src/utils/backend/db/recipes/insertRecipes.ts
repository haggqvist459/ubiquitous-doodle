import { supabase } from "@/supabase";

export async function insertRecipe(recipe: unknown) {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .insert([recipe])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error inserting recipe:", err);
    throw err;
  }
}