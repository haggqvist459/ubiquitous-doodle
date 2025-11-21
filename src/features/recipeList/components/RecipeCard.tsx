import { RecipeType } from "@/types";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/utils";

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <NavLink
      key={recipe.id}
      to={ROUTES.DETAILS_PAGE + recipe.id}
      state={{ recipe }}
      className="flex flex-col bg-white p-1 rounded-sm inset-shadow-xs/15 shadow-sm/15"
    >
      <span className="label line-clamp-2">{recipe.title}</span>
      <span className="line-clamp-3">{recipe.description}</span>
    </NavLink>
  )
}

export default RecipeCard;

// TODO IMPLEMENT FAVOURITE ICON ON CARD 