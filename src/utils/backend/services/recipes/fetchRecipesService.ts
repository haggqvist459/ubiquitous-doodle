import { mapRecipesDbToUI } from './mapRecipeUI'
import { fetchRecipesWithRelationsFromDB } from '../../db'


export const fetchRecipesFromService = async () => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB()
    return mapRecipesDbToUI(dbData)
  } catch (error) {
    console.error('fetchRecipesFromService failed', error)
    throw error
  }
}