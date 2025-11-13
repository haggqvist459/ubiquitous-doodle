import { getCuisinesService, getMainIngredientsService } from "@/utils/backend/services/";
import { handleError } from "../../utils";
import { FilterOptionType, LanguageType } from "../../types";


export const getMainIngredients = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await getMainIngredientsService(language);
    return data
  } catch (error) {
    return handleError(error, 'getMainIngredients')
  }
};

export const getCuisines = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await getCuisinesService(language);
    return data
  } catch (error) {
   return handleError(error, 'getCuisines')
  }
};