import { deleteFavourite } from "../../db/favourites";

export const removeFavouriteService = async (uid: string, recipeId: string): Promise<void> => {
  await deleteFavourite(uid, recipeId);
}