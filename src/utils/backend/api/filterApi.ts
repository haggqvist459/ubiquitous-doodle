import * as filtersService from "@/utils/backend/services/";

export const getMainIngredients = async () => {
  try {
    const data = await filtersService.getMainIngredients();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch main ingredients:", error);
    return { success: false, error: (error as Error).message };
  }
};

export const getCuisines = async () => {
  try {
    const data = await filtersService.getCuisines();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);
    return { success: false, error: (error as Error).message };
  }
};