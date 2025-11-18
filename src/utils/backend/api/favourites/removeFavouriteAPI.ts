import { removeFavouriteService } from "../../services/favourites";

export const removeFavouriteAPI = async (uid: string, recipeId: string): Promise<void> => {
 await removeFavouriteService(uid, recipeId) 
}