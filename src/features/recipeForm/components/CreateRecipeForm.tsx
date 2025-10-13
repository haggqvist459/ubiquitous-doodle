import { useState, useEffect } from "react";
import { MetaDataSection, IngredientSection, InstructionSection } from "./shared";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const CreateRecipeForm = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <form>
      <h2 className="section-header">Add Recipe</h2>
      {isLargeScreen ? (
        <div className="flex flex-row space-x-2 mt-2">
          <MetaDataSection />
          <IngredientSection />
          <InstructionSection />
        </div>
      ) : (
        <div className="mt-2">
          {currentSection === "metadata" && <MetaDataSection />}
          {currentSection === "ingredients" && <IngredientSection />}
          {currentSection === "instructions" && <InstructionSection />}
        </div>
      )}
    </form>
  );
}

export default CreateRecipeForm;