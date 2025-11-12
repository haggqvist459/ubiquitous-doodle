import { fetchRecipesService } from '@/utils/backend/services/recipes/';

export const fetchRecipesAPI = async () => {
  try {
    const recipes = await fetchRecipesService()
    return recipes
  } catch (error) {
    console.error('API error fetching recipes:', error)
    throw error
  }
}