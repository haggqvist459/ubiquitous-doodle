import { mapRecipesDbToUI } from './mapRecipeUI'
import { fetchRecipesWithRelationsFromDB } from '../../db'


export const fetchRecipesService = async () => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB()
    return mapRecipesDbToUI(dbData)
  } catch (error) {
    throw error
  }
}