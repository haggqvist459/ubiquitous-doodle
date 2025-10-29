import { useAppSelector } from "@/redux/hooks";
import { MetaDataSection, IngredientSection, InstructionSection, PreviewSection } from "../sections";
import { SlideWrapper, Modal } from "@/components";
import { useRecipeFormHandlers } from "../../hooks";


const CreateRecipeMobile = () => {

  const currentSection = useAppSelector(state => state.recipeForm.currentSection)
  
  const { handleNavigation, handleSubmit, modalState } = useRecipeFormHandlers();

  const mobileSlides = [
    { key: "Metadata", component: <MetaDataSection handleNavigation={handleNavigation} /> },
    { key: "Ingredients", component: <IngredientSection handleNavigation={handleNavigation} /> },
    { key: "Instructions", component: <InstructionSection handleNavigation={handleNavigation} /> },
    { key: "Preview", component: <PreviewSection /> },
  ];


  return (
    <div>
      <form onSubmit={handleSubmit} id="create-recipe-form">
        <SlideWrapper
          activeKey={currentSection}
          slides={mobileSlides}
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

export default CreateRecipeMobile;