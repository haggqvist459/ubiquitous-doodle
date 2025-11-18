import { useState } from "react";
import { Heading } from "@/components";
import { RecipeType } from "@/types";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

type Props = {
  recipe: RecipeType
}

const RecipeDetails = ({ recipe }: Props) => {

  const { language } = useLanguage()

  const [view, setView] = useState<"ingredients" | "instructions">("ingredients");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const toggleCompleted = (instructionId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(instructionId) ? next.delete(instructionId) : next.add(instructionId);
      return next;
    });
  };

  return (
    <div className="w-11/12 bg-white p-1 rounded-sm inset-shadow-xs/15 shadow-sm/15 mx-auto mt-5 mb-10 px-2 pb-5">
      <Heading title={recipe.title} />
      <Heading title={recipe.description ?? ''} headingType="sub-heading" />
      <div className="md:hidden">
        <button
          onClick={() => setView(view === "ingredients" ? "instructions" : "ingredients")}
          className="flex overflow-hidden rounded-full border border-primary-text mx-auto my-2 font-medium"
        >
          <div
            className={`flex-1 text-center py-1 px-3 ${view === "ingredients" ? "bg-primary" : "bg-white"
              }`}
          >
            {translateText('recipeDetailCard', 'ingredients', language)}
          </div>
          <div
            className={`flex-1 text-primary-text text-center py-1 px-3 border-l border-primary-text ${view === "instructions" ? "bg-primary" : "bg-white"
              }`}
          >
            {translateText('recipeDetailCard', 'instructions', language)}
          </div>
        </button>
        {view === "ingredients" ? (
          <ul className="list-disc list-inside px-2">
            {recipe.ingredients.map((ingredient) => (
              <li
                className="py-1"
                key={ingredient.id}>
                {ingredient.amount} {ingredient.unit} {translateText('recipeDetailCard', 'of', language)} {ingredient.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="">
            {recipe.instructions.map((instruction) => (
              <div
                key={instruction.id}
                className={`flex flex-col mt-2 cursor-pointer ${completedIds.has(instruction.id) ? "line-through bg-primary-bg" : ""
                  }`}
                onClick={() => toggleCompleted(instruction.id)}
              >
                <span className="label">{instruction.title}</span>
                <span>{instruction.text}</span>
              </div>
            ))}
          </div>
        )}

      </div>
      <div className="hidden md:flex md:flex-row md:space-x-3 mt-5 px-5">
        <div className="flex flex-col w-1/3 ">
          {recipe.ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex my-2">
              <span>{ingredient.amount} {ingredient.unit} {translateText('recipeDetailCard', 'of', language)} {ingredient.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-2/3">
          {recipe.instructions.map((instruction) => (
            <div
              key={instruction.id}
              className={`flex flex-col mt-2 cursor-pointer ${completedIds.has(instruction.id) ? "line-through bg-primary-bg" : ""
                }`}
              onClick={() => toggleCompleted(instruction.id)}>
              <span className="label">{instruction.title}</span>
              <span className="">{instruction.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails;