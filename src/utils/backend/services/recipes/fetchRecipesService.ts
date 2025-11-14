import { mapRecipesDbToUI } from './mapRecipeUI'
import { fetchRecipesWithRelationsFromDB } from '../../db'
import { handleError } from '../../utils'
import { RecipeType, LanguageType } from '../../types'

export const fetchRecipesService = async (language: LanguageType): Promise<RecipeType[]> => {
  try {
    const dbData = await fetchRecipesWithRelationsFromDB(language)
    return mapRecipesDbToUI(dbData)
  } catch (error) {
     return handleError(error, 'fetchRecipesService')
  }
}