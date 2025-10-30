import { getCuisinesService, getMainIngredientsService} from "@/utils/backend/services/";

export const getMainIngredients = async () => {
  try {
    const data = await getMainIngredientsService();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch main ingredients:", error);
    return { success: false, error: (error as Error).message };
  }
};

export const getCuisines = async () => {
  try {
    const data = await getCuisinesService();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);
    return { success: false, error: (error as Error).message };
  }
};