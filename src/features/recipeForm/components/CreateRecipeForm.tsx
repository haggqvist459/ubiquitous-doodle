import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { resetState } from "@/features/recipeForm";
import { createRecipe } from "@/utils/backend/api";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "./sections";
import { SlideWrapper, Modal, ModalStateType } from "@/components";


const CreateRecipeForm = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [viewMode, setViewMode] = useState<"Edit" | "Preview">("Edit");
  const recipeDraft = useAppSelector((state) => state.recipeForm.recipeDraft);
  const dispatch = useAppDispatch()

  const [modalState, setModalState] = useState<ModalStateType>({
    isOpen: false,
    message: '',
    title: '',
    onConfirm: () => { },
    onCancel: undefined
  })


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


  const resetForm = () => {
    setViewMode("Edit")
    dispatch(resetState())

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createRecipe(recipeDraft);

      if (result.success) {
        setModalState({
          isOpen: true,
          title: "Recipe Created",
          message: "Your recipe was successfully saved!",
          onConfirm: () => {
            resetForm();
            setModalState({
              isOpen: false,
              title: '',
              message: '',
              onConfirm: () => { },
              onCancel: undefined,
            });
          },
          onCancel: undefined
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setModalState({
        isOpen: true,
        title: "Error Creating Recipe",
        message: (err as Error).message || "Something went wrong while saving your recipe.",
        onConfirm: () => {
          setModalState({
            isOpen: false,
            title: '',
            message: '',
            onConfirm: () => { },
            onCancel: undefined,
          });
        },
        onCancel: undefined
      });
    }
  };
  
  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection handleNavigation={handleNavigation} /> },
    { key: "Ingredients", component: <IngredientSection handleNavigation={handleNavigation} /> },
    { key: "Instructions", component: <InstructionSection handleNavigation={handleNavigation} /> },
    { key: "Preview", component: <PreviewSection /> },
  ];

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
    <div className="">
      <form onSubmit={handleSubmit} id="create-recipe-form">
        <SlideWrapper
          activeKey={isLargeScreen ? viewMode : currentSection}
          slides={isLargeScreen ? desktopSlides : mobileSlides}
        />
      </form>
      <Modal
        title={modalState.title}
        description={modalState.message}
        isOpen={modalState.isOpen}
        onConfirm={modalState.onConfirm}
        onCancel={modalState.onCancel}
      />
    </div>
  );
}

export default CreateRecipeForm;
