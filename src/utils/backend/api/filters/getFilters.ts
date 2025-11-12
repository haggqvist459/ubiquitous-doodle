import { getCuisinesService, getMainIngredientsService} from "@/utils/backend/services/";

export const getMainIngredients = async () => {
  try {
    const data = await getMainIngredientsService();
    return data
  } catch (error) {
    console.error("Failed to fetch main ingredients:", error);
    throw error
  }
};

export const getCuisines = async () => {
  try {
    const data = await getCuisinesService();
    return data
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);
    throw error
  }
};