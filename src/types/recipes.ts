import { Database, Tables } from "./database.types"

export type RecipeDbType = Tables<"recipes">

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
  id: number
  name: string
  amount: number
  unit: Unit
}

export type InstructionType = {
  id: number,
  text: string,
}

export type RecipeType = {
  id: number
  title: string
  subtitle: string | null
  cuisine: Database["public"]["Enums"]["cuisine"] | null
  type: Database["public"]["Enums"]["main_ingredient"]
  includeWeekly: boolean
  ingredients: IngredientType[]
  instructions: InstructionType[] | null
  createdAt: Date
}