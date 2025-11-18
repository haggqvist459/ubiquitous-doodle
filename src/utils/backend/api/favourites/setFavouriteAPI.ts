import { setFavouriteService } from "../../services/favourites/setFavouriteService";
import { FavouriteType } from "../../types";


export const setFavouriteAPI = async (uid: string, recipeId: string): Promise<FavouriteType> => {

  return await setFavouriteService(uid, recipeId);
  

}