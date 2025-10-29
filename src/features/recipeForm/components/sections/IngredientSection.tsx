import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { UNITS } from "@/utils";
import { Input, Dropdown, createDropdownOptions, Header, Trashcan, ToggleButton, FadeWrapper } from "@/components";
import { addIngredient, updateIngredientField, removeIngredient, selectIngredients, setCurrentSection, setIngredients } from "@/features/recipeForm";
import { parseIngredientList } from "../../utils/parseIngredients";
import SectionWrapper from "../shared/SectionWrapper";



type Props = {
  handleNavigation?: (action: () => void) => void;
};

const IngredientSection = ({ handleNavigation }: Props) => {

  const ingredients = useAppSelector(selectIngredients)
  const dispatch = useAppDispatch()
  const [localIngredients, setLocalIngredients] = useState(ingredients)
  const [displayPasteView, setDisplayPasteView] = useState(true)
  const [pastedText, setPastedText] = useState("");

  const unitOptions = createDropdownOptions(UNITS)

  useEffect(() => {
    setLocalIngredients(ingredients);
  }, [ingredients]);

  const handleIngredientChange = (
    id: string,
    key: keyof (typeof localIngredients)[number],
    value: string
  ) => {
    setLocalIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [key]: value } : ingredient
      )
    );
  };

  const handleIngredientDispatch = (id: string, key: keyof (typeof localIngredients)[number]) => {
    const ingredient = localIngredients.find(item => item.id === id);
    if (!ingredient) return;
    dispatch(updateIngredientField({ id, key, value: ingredient[key] }));
  };

  const handleParsedIngredients = () => {
    const ingredientList = parseIngredientList(pastedText)
    dispatch(setIngredients(ingredientList))
    setDisplayPasteView(false)
  }

  return (
    <SectionWrapper>
      <div className="flex justify-between">
        <Header title="Add Ingredients" />
        <div className="flex flex-col items-end pr-2">
          <span className="text-sm font-medium">Simplified entry</span>
          <ToggleButton isToggled={displayPasteView} onToggle={() => { setDisplayPasteView(prev => !prev) }} />
        </div>
      </div>
      <FadeWrapper key={displayPasteView ? "paste" : "manual"}>
        <div className="h-[60vh] flex flex-col">
          {displayPasteView ? (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                <Input
                  multiline={true}
                  rows={15}
                  id="pasteIngredientField"
                  placeholder="Paste the entire ingredient list here"
                  label="Ingredients"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => handleParsedIngredients()}
              >
                Parse Ingredients
              </button>
            </>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                {localIngredients.map((ingredient) => (
                  <div
                    className="flex flex-col xs:flex-row xs:items-end w-full space-x-1 mt-2"
                    key={`${ingredient.id}-ingredient`}
                  >
                    <Input
                      id={`${ingredient.id}-ingredientText`}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, "name", e.target.value)
                      }
                      onBlur={() => handleIngredientDispatch(ingredient.id, "name")}
                      placeholder="..."
                      value={ingredient.name}
                      label="Ingredient"
                      required
                      autoComplete="off"
                    />
                    <Input
                      id={`${ingredient.id}-ingredientAmount`}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, "amount", e.target.value)
                      }
                      onBlur={() => handleIngredientDispatch(ingredient.id, "amount")}
                      placeholder="0"
                      value={ingredient.amount}
                      label="Amount"
                      required
                      autoComplete="off"
                      inputType="number"
                      allowDecimals
                    />
                    <Dropdown
                      id={`${ingredient.id}-ingredientUnit`}
                      label="Unit"
                      onChange={(e) =>
                        dispatch(
                          updateIngredientField({
                            id: ingredient.id,
                            key: "unit",
                            value: e.target.value,
                          })
                        )
                      }
                      options={unitOptions}
                      defaultValue={'-'}
                      value={ingredient.unit}
                      required={true}
                    />
                    <button
                      type="button"
                      className="mb-0.5 mr-1 disabled:opacity-50"
                      onClick={() =>
                        dispatch(removeIngredient({ id: ingredient.id }))
                      }
                      disabled={localIngredients.length === 1}
                    >
                      <Trashcan />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => dispatch(addIngredient())}
              >
                Add Ingredient
              </button>
            </>
          )}
        </div>
      </FadeWrapper>
      {handleNavigation && (
        <div className="w-full flex space-x-2 md:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary font-medium text-primary-text rounded"
            onClick={() => dispatch(setCurrentSection("Metadata"))}
          >
            Back
          </button>
          <button
            type="button"
            className="w-1/2 bg-primary font-medium text-primary-text rounded"
            onClick={() => handleNavigation(() => dispatch(setCurrentSection("Instructions")))}
          >
            Next
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default IngredientSection;