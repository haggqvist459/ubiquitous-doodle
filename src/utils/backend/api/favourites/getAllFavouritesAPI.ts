import { getAllFavouritesService } from "../../services/favourites/getAllFavouritesService";
import { FavouriteType } from "../../types";

export const getAllFavouritesAPI = async (uid: string): Promise<FavouriteType[]> => {

  const data = await getAllFavouritesService(uid);
  return data;
  
}