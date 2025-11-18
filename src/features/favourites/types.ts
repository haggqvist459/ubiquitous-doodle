
export type FavouriteType = {
  userId: string,
  recipeId: string,
  createdAt: string
}

export type FavouriteSliceType = {
  favouriteList: FavouriteType[]
}