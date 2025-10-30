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

export type RecipeListType = {
  id: string
  createdAt: Date
  title: string
  description: string
  includeWeekly: boolean
  types: FilterOptionType[] | []
  cuisines: FilterOptionType[] | []
  instructions: InstructionType[]
  ingredients: IngredientType[]
}

