import { fetchRecipesService } from '@/utils/backend/services/recipes/';
import { handleError } from '../../utils';
import { RecipeType } from '../../types';

export const fetchRecipesAPI = async (): Promise<RecipeType[]> => {
  try {
    const recipes = await fetchRecipesService()
    return recipes
  } catch (error) {
    return handleError(error, 'fetchRecipesAPI')
  }
}