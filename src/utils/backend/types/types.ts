import { UNITS } from '../constants'

export type Unit = (typeof UNITS)[number];

export type FilterOptionType = {
  id: string;
  name: string;
};

export type IngredientType = {
  id: string
  name: string
  amount: string
  unit: Unit | ''
}

export type InstructionType = {
  id: string,
  order: number,
  title: string,
  text: string,
}

export type RecipeType = {
  id: string
  createdAt: Date
  title: string
  description: string | null
  cuisines: FilterOptionType[] | null
  types: FilterOptionType[] | null
  includeWeekly: boolean
  ingredients: IngredientType[]
  instructions: InstructionType[]
}

