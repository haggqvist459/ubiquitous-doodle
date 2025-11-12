import { getCuisinesService, getMainIngredientsService } from "@/utils/backend/services/";
import { handleError } from "../../utils";
import { FilterOptionType } from "../../types";


export const getMainIngredients = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await getMainIngredientsService();
    return data
  } catch (error) {
    return handleError(error, 'getMainIngredients')
  }
};

export const getCuisines = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await getCuisinesService();
    return data
  } catch (error) {
   return handleError(error, 'getCuisines')
  }
};