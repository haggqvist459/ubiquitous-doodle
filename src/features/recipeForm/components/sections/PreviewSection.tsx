import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectIngredients, selectInstructions, selectMetadata, setCurrentSection } from "@/features/recipeForm";
import SectionWrapper from "../shared/SectionWrapper";
import { Header, Output } from '@/components'



const PreviewSection = () => {

  const dispatch = useAppDispatch()
  const metaData = useAppSelector(selectMetadata);
  const ingredients = useAppSelector(selectIngredients)
  const instructions = useAppSelector(selectInstructions)

  return (
    <SectionWrapper>
      <div className="md:px-5 md:pt-2">
        <Header title="Preview recipe" />
        <div className="h-[60vh] flex flex-col flex-grow overflow-y-auto space-y-4 md:flex-row md:justify-between">
          <div className="space-y-2 w-full">
            <Output
              label="Title"
              value={metaData.title}
            />
            <Output
              label="Description"
              value={metaData.description ?? 'No description added for this recipe.'}
            />
            <Header title="Types" headerType="sub-header" />
            <div className="flex">
              {metaData.types?.map((type) => (
                <Output
                  key={type.id}
                  value={type.name}
                />
              ))}
            </div>
            <Header title="Cuisines" headerType="sub-header" />
            <div className="flex">
              {metaData.cuisines?.map((cuisine) => (
                <Output
                  key={cuisine.id}
                  value={cuisine.name}
                />
              ))}
            </div>
            <Output
              label="Include in weekly suggestions"
              value={metaData.includeWeekly ? "Yes" : "No"}
            />
          </div>
          <div className="space-y-2 w-full">
            <Header title="Ingredients" headerType="sub-header" />
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="">
                <Output
                  value={`- ${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2 w-full">
            <Header title="Instructions" headerType="sub-header" />
            {instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="flex flex-col">
                <Output
                  value={instruction.title}
                />
                <Output
                  value={instruction.text}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-2 flex space-x-2 md:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary font-medium text-primary-text rounded"
            onClick={() => dispatch(setCurrentSection('Instructions'))}
          >
            Back
          </button>
          <button
            type="submit"
            form="create-recipe-form"
            className="w-1/2 bg-primary font-medium text-primary-text rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default PreviewSection;
