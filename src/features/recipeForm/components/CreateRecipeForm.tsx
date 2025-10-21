import { useState, useEffect } from "react";
import { MetaDataSection, IngredientSection, InstructionSection } from "./sections";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import PreviewSection from "./sections/PreviewSection";
import { SlideWrapper } from "@/components";

const CreateRecipeForm = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [viewMode, setViewMode] = useState<"Edit" | "Preview">("Edit");


  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (action: () => void) => {
    const form = document.querySelector("form");
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    action();
  };

  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection handleNavigation={handleNavigation} /> },
    { key: "Ingredients", component: <IngredientSection handleNavigation={handleNavigation} /> },
    { key: "Instructions", component: <InstructionSection handleNavigation={handleNavigation} /> },
    { key: "Preview", component: <PreviewSection /> },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("recipe submit clicked")
  };

  const desktopSlides = [
    {
      key: "Edit", component: (
        <div className="">
          <div className="flex space-x-2 mt-2">
            <MetaDataSection />
            <IngredientSection />
            <InstructionSection />
          </div>
          <div className="w-full flex justify-end mt-4 pl-4">
            <button
              type="button"
              onClick={() =>
                handleNavigation(() => setViewMode("Preview"))
              }
              className="w-1/3 bg-primary font-medium rounded border-primary border-2 hover:border-primary-text"
            >
              Preview Recipe
            </button>
          </div>
        </div>
      )
    },
    {
      key: "Preview", component: (
        <div className="mx-auto w-2/3">
          <PreviewSection />
          <div className="w-full flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setViewMode("Edit")}
              className="w-1/3 bg-secondary font-medium rounded border-secondary border-2 text-primary-text hover:border-primary-text"
            >
              Edit Recipe
            </button>
            <button
              type="submit"
              className="w-1/3 bg-primary font-medium rounded border-primary border-2 text-primary-text hover:border-primary-text"
            >
              Submit
            </button>
          </div>
        </div>
      )
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <SlideWrapper
        activeKey={isLargeScreen ? viewMode : currentSection}
        slides={isLargeScreen ? desktopSlides : mobileSlides}
      />
    </form>
  );
}

export default CreateRecipeForm;
