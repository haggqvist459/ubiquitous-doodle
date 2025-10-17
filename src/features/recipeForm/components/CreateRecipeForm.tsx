import { useState, useEffect } from "react";
import { MetaDataSection, IngredientSection, InstructionSection } from "./sections";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import PreviewSection from "./sections/PreviewSection";
import { SlideWrapper } from "@/components";

const CreateRecipeForm = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection /> },
    { key: "Ingredients", component: <IngredientSection /> },
    { key: "Instructions", component: <InstructionSection /> },
    { key: "Preview", component: <PreviewSection /> },
  ];


  const desktopSlides = [
    {
      key: "edit", component: (
        <div className="">
          <div className="flex space-x-2 mt-2">
            <MetaDataSection />
            <IngredientSection />
            <InstructionSection />
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className="primary-button"
            >
              Preview Recipe
            </button>
          </div>
        </div>
      )
    },
    {
      key: "preview", component: (
        <>
          <PreviewSection />
          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className="primary-button"
            >
              Edit Recipe
            </button>
          </div>
        </>
      )
    },
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <form onSubmit={(e) => e.preventDefault()}>
        <SlideWrapper
          activeKey={isLargeScreen ? viewMode : currentSection}
          slides={isLargeScreen ? desktopSlides : mobileSlides}
        />
      </form>
      <button className="hidden" type="submit">

      </button>
    </form>
  );
}

export default CreateRecipeForm;

/*


  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {isLargeScreen ? (
        viewMode === "edit" ? (
          <div className="">
            <div className="flex flex-row space-x-2 mt-2">
              <MetaDataSection />
              <IngredientSection />
              <InstructionSection />
            </div>
            <div className="w-full flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className="primary-button"
              >
                Preview Recipe
              </button>
            </div>
          </div>
        ) : (
          <>
            <PreviewSection />
            <div className="w-full flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setViewMode("edit")}
                className="primary-button"
              >
                Edit Recipe
              </button>
            </div>
          </>
        )
      ) : (
        <div className="mt-2">
          {currentSection === "Metadata" && <MetaDataSection />}
          {currentSection === "Ingredients" && <IngredientSection />}
          {currentSection === "Instructions" && <InstructionSection />}
          {currentSection === "Preview" && <PreviewSection />}
        </div>
      )}
      <button className="hidden" type="submit">

      </button>
    </form>
  );
}


*/