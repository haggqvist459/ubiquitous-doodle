import { fetchRecipesFromService } from '@/utils/backend/services/recipes/';

export const fetchRecipesAPI = async () => {
  try {
    const recipes = await fetchRecipesFromService()
    return { success: true, data: recipes }
  } catch (error) {
    console.error('API error fetching recipes:', error)
    return { success: false, message: (error as Error).message }
  }
}