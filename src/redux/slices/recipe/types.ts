import { Database } from "@/types/database.types"
import { IngredientType } from "@/types/"

export type RecipeStateData = {
  id: number | null
  title: string
  subtitle: string
  cuisine: Database["public"]["Enums"]["cuisine"] | null
  type: Database["public"]["Enums"]["main_ingredient"] | null
  includeWeekly: boolean
  ingredients: IngredientType[]
  instructions: string[]
}