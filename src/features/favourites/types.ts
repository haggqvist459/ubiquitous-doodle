
export type FavouriteType = {
  userId: string,
  recipeId: string,
  createdAt: string,
  title: string
}

export type FavouriteSliceType = {
  favouriteList: FavouriteType[]
  isLoaded: boolean
}