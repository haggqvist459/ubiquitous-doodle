import { useState } from "react";
import { Heading, Favourite } from "@/components";
import { RecipeType } from "@/types";
import { useAuth, useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { setFavouriteAPI, removeFavouriteAPI } from "@/utils/backend/api/favourites";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFavourite, removeFavourite } from "@/features/favourites";

type Props = {
  recipe: RecipeType
}

const RecipeDetails = ({ recipe }: Props) => {

  const { language } = useLanguage()
  const { user } = useAuth();

  const dispatch = useAppDispatch()
  const favouriteIds = useAppSelector(state => state.favourites.favouriteList)
  const isToggled = favouriteIds.some(f => f.recipeId === recipe.id)

  const [view, setView] = useState<"ingredients" | "instructions">("ingredients");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const toggleCompleted = (instructionId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(instructionId) ? next.delete(instructionId) : next.add(instructionId);
      return next;
    });
  };

  const toggleFavourite = async () => {
    if (!user) return

    try {
      if (isToggled) {
        await removeFavouriteAPI(user.id, recipe.id)
        dispatch(removeFavourite(recipe.id))
      } else {
        const newFavourite = await setFavouriteAPI(user.id, recipe.id)
        dispatch(addFavourite(newFavourite))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('toggleFavourite error:', error)
        // redirect to error page, pass error
      } else {
        console.error('Unknown error: ', error)
      }
    }
  }

  return (
    <div className="w-11/12 bg-white p-1 rounded-sm inset-shadow-xs/15 shadow-sm/15 mx-auto mt-5 mb-10 px-2 pb-5">
      <div className="flex justify-between items-center px-5">
        <div className="">
          <Heading title={recipe.title} />
          <Heading title={recipe.description ?? ''} headingType="sub-heading" />
        </div>
        <div className="py-2"
          onClick={() => toggleFavourite()}
        >
          {user && <Favourite isToggled={isToggled} />}
        </div>
      </div>

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
      <div className="hidden md:flex md:flex-row md:space-x-3 mt-10 px-5">
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