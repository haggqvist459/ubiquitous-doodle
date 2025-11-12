import { fetchSingleRecipeService } from "../../services";


export const fetchSingleRecipeAPI = async (id: string) => {

  try {
    const recipe = await fetchSingleRecipeService(id)
    return recipe
  } catch (error) {
    throw error
  }

}