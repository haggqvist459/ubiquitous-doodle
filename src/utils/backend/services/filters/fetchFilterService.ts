import { fetchMainIngredients, fetchCuisines } from "@/utils/backend/db/filters/fetchFilters";
import { handleError } from "../../utils";
import { FilterOptionType } from "../../types";

export const getMainIngredientsService = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await fetchMainIngredients();
    return data;
  } catch (error) {
    return handleError(error, 'getMainIngredientsService')
  }
};

export const getCuisinesService = async (): Promise<FilterOptionType[]> => {
  try {
    const data = await fetchCuisines();
    return data;
  } catch (error) {
    return handleError(error, 'getCuisinesService')
  }
};