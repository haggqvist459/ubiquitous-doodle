import { supabase } from "../client";

export const insertRecipe = async (recipe: unknown) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("No active Supabase session");

  const authClient = supabase.from("recipes").insert([recipe]).select();

  try {
    const { data, error } = await authClient;
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error inserting recipe:", err);
    throw err;
  }
};