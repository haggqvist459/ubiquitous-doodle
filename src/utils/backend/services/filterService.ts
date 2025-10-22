import { fetchMainIngredients, fetchCuisines } from "@/utils/backend/db/filters";

export const getMainIngredients = async () => {
  const data = await fetchMainIngredients();
  if (!data) throw new Error("No data returned from main_ingredients");
  return data;
};

export const getCuisines = async () => {
  const data = await fetchCuisines();
  if (!data) throw new Error("No data returned from cuisines");
  return data;
};