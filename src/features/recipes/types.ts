import { Database } from "@/types/database.types"

export type Unit =
  | "-"
  | "tsp"
  | "tbsp"
  | "pcs"
  | "g"
  | "kg"
  | "ml"
  | "cl"
  | "dl"
  | "l"

export type IngredientType = {
  name: string
  amount: number
  unit: Unit
}

export type RecipeType = {
  id: number
  title: string
  subtitle: string | null
  cuisine: Database["public"]["Enums"]["cuisine"] | null
  type: Database["public"]["Enums"]["main_ingredient"]
  includeWeekly: boolean
  ingredients: IngredientType[]
  instructions: string[] | null
  createdAt: Date
}



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