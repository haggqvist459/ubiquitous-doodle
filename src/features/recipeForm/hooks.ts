import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetState } from "@/features/recipeForm";
import { createRecipe } from "@/utils/backend/api";
import { useState } from "react";
import { ModalStateType } from "@/components";

export const useRecipeFormHandlers = () => {
  const recipeDraft = useAppSelector(state => state.recipeForm.recipeDraft);
  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState<ModalStateType>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    onCancel: undefined,
  });

  const handleNavigation = (action: () => void) => {
    const formElement = document.querySelector("form");
    if (formElement && !formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    action();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await createRecipe(recipeDraft);
      if (result.success) {
        setModalState({
          isOpen: true,
          title: "Recipe Created",
          message: "Your recipe was successfully saved!",
          onConfirm: () => {
            dispatch(resetState());
            setModalState(prev => ({ ...prev, isOpen: false }));
          },
          onCancel: undefined,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setModalState({
        isOpen: true,
        title: "Error Creating Recipe",
        message: (error as Error).message,
        onConfirm: () => setModalState(prev => ({ ...prev, isOpen: false })),
        onCancel: undefined,
      });
    }
  };

  return { handleNavigation, handleSubmit, modalState, setModalState };
};