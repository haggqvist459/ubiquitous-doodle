import { fetchRecipesService } from '@/utils/backend/services/recipes/';
import { handleError } from '../../utils';
import { RecipeType, LanguageType } from '../../types';

export const fetchRecipesAPI = async (language: LanguageType): Promise<RecipeType[]> => {
  try {
    const recipes = await fetchRecipesService(language)
    return recipes
  } catch (error) {
    return handleError(error, 'fetchRecipesAPI')
  }
}