import { RecipeType } from '@/types';
import RecipeCard from './RecipeCard';

type Props = {
  recipeList: RecipeType[]
}

const RecipeList = ({ recipeList }: Props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {recipeList.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe}/>
      ))}
    </div>
  )
}

export default RecipeList;