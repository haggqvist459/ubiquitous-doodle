import { fetchMainIngredients, fetchCuisines } from "@/utils/backend/db/filters/fetchFilters";

export const getMainIngredientsService = async () => {
  try {
    const data = await fetchMainIngredients();
    return data;
  } catch (error) {
    console.error("getMainIngredientsService failed:", error);
    throw error;
  }
};

export const getCuisinesService = async () => {
  try {
    const data = await fetchCuisines();
    return data;
  } catch (error) {
    console.error("getCuisinesService failed:", error);
    throw error;
  }
};