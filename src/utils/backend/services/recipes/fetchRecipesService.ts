import { mapRecipesDbToUI } from './mapRecipeUI'
import { fetchRecipesWithRelationsFromDB } from '../../db'
import { handleError } from '../../utils'
import { RecipeType } from '../../types'

export const fetchRecipesService = async (): Promise<RecipeType[]> => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB()
    return mapRecipesDbToUI(dbData)
  } catch (error) {
     return handleError(error, 'fetchRecipesService')
  }
}