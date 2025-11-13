import { selectMainIngredients, selectCuisines } from "@/utils/backend/db/filters/selectFilters";
import { handleError } from "../../utils";
import { FilterOptionType, LanguageType } from "../../types";

export const getMainIngredientsService = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await selectMainIngredients(language);
    return data;
  } catch (error) {
    return handleError(error, 'getMainIngredientsService')
  }
};

export const getCuisinesService = async (language: LanguageType): Promise<FilterOptionType[]> => {
  try {
    const data = await selectCuisines(language);
    return data;
  } catch (error) {
    return handleError(error, 'getCuisinesService')
  }
};