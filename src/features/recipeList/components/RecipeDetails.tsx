import { useState } from "react";
import { Header } from "@/components";
import { RecipeType } from "@/types";

type Props = {
  recipe: RecipeType
}

const RecipeDetails = ({ recipe }: Props) => {

  const [view, setView] = useState<"ingredients" | "instructions">("ingredients");

  return (
    <div className="w-11/12 bg-white p-1 rounded-sm inset-shadow-xs/15 shadow-sm/15 mx-auto px-2 pb-5">
      <Header title={recipe.title} />
      <Header title={recipe.description ?? ''} headerType="sub-header" />
      <div className="md:hidden">
        <button
          onClick={() => setView(view === "ingredients" ? "instructions" : "ingredients")}
          className="flex overflow-hidden rounded-full border border-primary-text mx-auto my-2 font-medium"
        >
          <div
            className={`flex-1 text-center py-1 px-3 ${view === "ingredients" ? "bg-primary" : "bg-white"
              }`}
          >
            Ingredients
          </div>
          <div
            className={`flex-1 text-primary-text text-center py-1 px-3 border-l border-primary-text ${view === "instructions" ? "bg-primary" : "bg-white"
              }`}
          >
            Instructions
          </div>
        </button>
        {view === "ingredients" ? (
          <div>
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.id}>
                <span>
                  {ingredient.amount} {ingredient.unit} of {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {recipe.instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="flex flex-col mt-2"
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
              <span>{ingredient.amount} {ingredient.unit} of {ingredient.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-2/3">
          {recipe.instructions.map((instruction) => (
            <div
              key={instruction.id}
              className="flex flex-col mt-2">
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