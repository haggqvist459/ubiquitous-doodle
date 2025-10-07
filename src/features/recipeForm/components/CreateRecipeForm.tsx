import { MetaDataSection, IngredientSection, InstructionSection } from "./shared";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const CreateRecipeForm = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)

  return (
    <form>
      {/* display all sections on larger screens */}
      <div className="hidden md:flex flex-row space-x-2">
        <MetaDataSection />
        <IngredientSection />
        <InstructionSection />
      </div>
      {/* display sections one by one on smaller screens */}
      <div className="md:hidden">
        {currentSection === "metadata" && <MetaDataSection />}
        {currentSection === "ingredients" && <IngredientSection />}
        {currentSection === "instructions" && <InstructionSection />}
      </div>
    </form>
  );
}

export default CreateRecipeForm;