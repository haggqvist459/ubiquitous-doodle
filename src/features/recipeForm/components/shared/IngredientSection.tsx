import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addIngredient, updateIngredientField, removeIngredient, selectIngredients } from "@/features/recipeForm";
import { Input, Dropdown, createDropdownOptions, Header, Trashcan, } from "@/components";
import { UNITS } from "@/utils";
import SectionWrapper from "./SectionWrapper";

const IngredientSection = () => {

  const ingredients = useAppSelector(selectIngredients)
  const dispatch = useAppDispatch()
  const [localIngredients, setLocalIngredients] = useState(ingredients)

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

    // dispatch the field update to Redux
    dispatch(updateIngredientField({ id, key, value: ingredient[key] }));
  };

  return (
    <SectionWrapper>
      <Header title="Add Ingredients" />
      {localIngredients.map((ingredient) => (
        <div
          className="flex flex-col xs:flex-row xs:items-end w-full space-x-1"
          id={`${ingredient.id}-ingredient`}
        >
          <Input
            id={`${ingredient.id}-ingredientNa\u200cme`}
            onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}
            onBlur={() => handleIngredientDispatch(ingredient.id, 'name')}
            placeholder="Minced meat"
            value={ingredient.name}
            label="Ingredient"
            required={true}
            autoComplete="off"
          />
          <Input
            id={`${ingredient.id}-ingredientAmount`}
            onChange={(e) => { handleIngredientChange(ingredient.id, 'amount', e.target.value) }}
            onBlur={() => handleIngredientDispatch(ingredient.id, 'amount')}
            placeholder="500"
            value={ingredient.amount}
            label="Amount"
            required={true}
            autoComplete="off"
          />
          <Dropdown
            id={`${ingredient.id}-ingredientUnit`}
            label="Unit"
            onChange={(e) =>
              dispatch(updateIngredientField({ id: ingredient.id, key: "unit", value: e.target.value }))
            }
            options={unitOptions}
            value={ingredient.unit}
          />
          <button
            type="button"
            className="mb-0.5 mr-1 disabled:opacity-50"
            onClick={() => dispatch(removeIngredient({ id: ingredient.id }))}
            disabled={localIngredients.length === 1}
          >
            <Trashcan />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="primary-button"
        onClick={() => dispatch(addIngredient())}
      >
        Add Ingredient
      </button>
    </SectionWrapper>
  );
}

export default IngredientSection;