import { supabase } from "@/supabase";

export async function insertRecipe(recipe: unknown) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("No active Supabase session");

  const authedClient = supabase
    .from("recipes")
    .insert([recipe])
    .select();

  try {
    const { data, error } = await authedClient;
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error inserting recipe:", err);
    throw err;
  }
}



// import { supabase } from "@/supabase";

// export async function insertRecipe(recipe: unknown) {
//   console.log(await supabase.auth.getSession());
//   try {
//     const { data, error } = await supabase
//       .from("recipes")
//       .insert([recipe])
//       .select();

//     if (error) throw error;
//     return data;
//   } catch (err) {
//     console.error("Error inserting recipe:", err);
//     throw err;
//   }
// }