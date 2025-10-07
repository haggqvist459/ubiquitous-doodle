import { RecipeType } from "@/types"

export type RecipeDraftType = Omit<RecipeType, "id" | "createdAt" | "type"> & {
  type: RecipeType["type"] | null
}

export type RecipeFormState = {
  recipeDraft: RecipeDraftType
  currentSection: "metadata" | "ingredients" | "instructions"
}